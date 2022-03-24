#!/usr/bin/python3

import re
import numpy as np
import utils
import gc
import os

#'BESFU', 'BESSU', 'ece', 'ecevs' the new channel names in shot files

class Params:
    def __init__(self,inpath,outpath,shot,nece=512,nbes=1024):
        self.inpath = inpath
        self.outpath = outpath
        self.shot = shot
        self.nsamples = {'ece':nece, 'bes':nbes}
        self.t = {}
        self.tstep = {}
        self.inds_coince = {}
        self.sz = {}
        self.nfolds = {}
        self.dirthresh = {}
        self.chans = {}
        self.chan = {'ece':-1,'bes':-1}
        self.mask = {}
        self.MASK = {}
        self.dct_filt = {}
        self.dct_deriv_filt = {}
        self.fails = {}
        self.tid = -1

    def getProcID(self):
        return os.getpid()

    def setThreadID(self,x):
        self.tid = int(x)
        return self

    def getThreadID(self):
        return self.tid

    def setNsamples(self,s,n):
        self.nsamples[s]=n
        return self
    def getNsamples(self,s):
        return self.nsamples[s]

    def checkFails(self,f,fails,dets={'ece':'ecevs','bes':'BESFU'}):
        for d in dets.keys():
            self.fails[d] = (f[d]['failed'][()]).astype(str)
        return self

    def initTimesChans(self,f,dets={'ece':'ecevs','bes':'BESFU'}): # updated for Finn ecebes_######.h5 input files.
        times = {}
        for d in dets.keys():
            times[d] = (f[dets[d]]['times'][()]*1e3+.26).astype(np.int32)
            self.chans[d] = [k for k in f[dets[d]].keys() if re.search(dets[d],k)]
            self.tstep[d] = times[d][1]-times[d][0]
        self.t['min'] = np.max([np.min(times[d]) for d in dets.keys()])
        self.t['max'] = np.min([np.max(times[d]) for d in dets.keys()])
        for d in dets.keys():
            self.inds_coince[d] = np.where((times[d]>self.t['min']) * (times[d]<self.t['max']))[0]
            self.nfolds[d] = int(self.inds_coince[d].shape[0]//self.nsamples[d])
            self.sz[d] = self.nfolds[d]*self.nsamples[d]
        del times
        gc.collect()
        return self

    def fillData(self,f,dets={'ece':'ecevs','bes':'BESFU'},data={}): # updated for Finn ecebes_######.h5 input files.
        for d in dets.keys():
            data[d] = [(f[dets[d]][c][()]*(2**12)/10.).astype(np.int16) for c in self.chans[d]]
        return data

    def initH5det(self,f,detkey):
        dgrp = f.create_group(detkey)
        dgrp.attrs.create('nfolds',self.nfolds[detkey])
        dgrp.attrs.create('sz',self.sz[detkey])
        dgrp.attrs.create('nsamples',self.nsamples[detkey])
        return self

    def fillH5times(self,f,detkey):
        tgrp = f[detkey].create_group('t')
        tgrp.attrs.create('min',self.t['min'])
        tgrp.attrs.create('max',self.t['max'])
        tgrp.attrs.create('step',self.tstep[detkey])
        return self

    def getSize(self,det = 'ece'):
        return self.sz[det]

    def setThresh(self,f,det = 'ece'):
        if det == 'ece':
            self.dirthresh[det] = 1.e3*np.exp(-1.*np.power(np.arange(self.nsamples[det])/500.,int(2))) + 100. 
        if det == 'bes':
            self.dirthresh[det] = np.ones((self.nsamples[det],),dtype=np.float32)
        f[det].create_dataset('directionThresh',data = self.dirthresh[det])
        return self

    def initH5datasets(self,f,detkey):
        if detkey == 'ece':
            ecegrp = f[detkey]
            eceorig = ecegrp.create_group('orig')
            ecelogabs = ecegrp.create_group('logabs')
            ecedirectional = ecegrp.create_group('directional').attrs.create('threshold',1.e3*np.exp(-1.*np.power(np.arange(self.nsamples[detkey])/500.,int(2))) + 100.)
            eceloc = ecegrp.create_group('loc')
            eceloc.create_group('R')
            eceloc.create_group('time')
            ecesign = ecegrp.create_group('sign')
        if detkey == 'bes':
            besgrp = f[detkey]
            besorig = besgrp.create_group('orig')
            beslogabs = besgrp.create_group('logabs')
            besdirectional = besgrp.create_group('directional').attrs.create('threshold',1.e3*np.exp(-1.*np.power(np.arange(self.nsamples[detkey])/500.,int(2))) + 100.)
            bespop = besgrp.create_group('pop')
            besloc = besgrp.create_group('loc')
            besloc.create_group('R')
            besloc.create_group('Z')
            bessign = besgrp.create_group('sign')
        return self

    def initMasks(self,f,det):
        self.mask[det],self.MASK[det] = utils.getderivmask3((self.nsamples[det],self.nfolds[det]))
        f[det].create_dataset('mask', data = self.mask[det])
        f[det].create_dataset('MASK', data = self.MASK[det])
        return self

    def buildFilt(self,f,det):
        self.dct_filt[det] = utils.dct_buildfilt((2*self.nsamples[det],self.nfolds[det]),cut=(0,self.nsamples[det])) # remember, we need to mirror the nfolds dimension, thus the *2
        f[det].create_dataset('dct_filt', data=self.dct_filt[det])
        if det == 'bes':
            self.dct_deriv_filt[det] = utils.dct_deriv_buildfilt((2*self.nsamples[det],self.nfolds[det]),cut=(0,self.nsamples[det])) # remember, we need to mirror the nfolds dimension, thus the *2
            f[det].create_dataset('dct_deriv_filt', data = self.dct_deriv_filt[det])
        return self

    def goodChanKey(self,key,det):
        m = re.search('^(\w{3}).{2}(\d+)$',key)
        if not m:
            self.chan[det] = -1
            return False
        if m.group(1)=='ece' or m.group(1)=='bes':
            self.chan[det] = np.uint8(m.group(2))-1 # accommodating the historical counting from 1
            print('shot%i\tdet:%s\tpid%i\t%s\t%s\t%ix%i'%(self.shot,det,os.getpid(),m.group(0),self.chan[det],self.nsamples[det],self.nfolds[det]))
        return True

    def getChan(self,det):
        return self.chan[det]

    def setOrig(self,f,det,d):
        f[det]['orig'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setLogAbs(self,f,det,d):
        f[det]['logabs'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setSignBool(self,f,det,d):
        f[det]['sign'].create_dataset('%02i'%self.chan[det],data=d.astype(bool),dtype=bool)
        return self

    def setDirectional(self,f,det,d):
        f[det]['directional'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setPop(self,f,det,d):
        f[det]['pop'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setLocR(self,f,det,d):
        f[det]['loc']['R'].create_dataset('%02i'%self.chan[det],data=d,dtype=np.float16)
        return self

    def setLocTime(self,f,det,d):
        f[det]['loc']['time'].create_dataset('%02i'%self.chan[det],data=d,dtype=np.float16)
        return self

    def setLocZ(self,f,det,d):
        f[det]['loc']['Z'].create_dataset('%02i'%self.chan[det],data=d,dtype=np.float16)
        return self

