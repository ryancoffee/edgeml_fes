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

    def initH5(self,f,dets):
        for dk in dets.keys():
            grp = f.create_group(dk)
            grp.attrs.create('nfolds',self.nfolds[dk])
            grp.attrs.create('sz',self.sz[dk])
            grp.attrs.create('nsamples',self.nsamples[dk])
            ## fill times
            tgrp = grp.create_group('t')
            tgrp.attrs.create('min',self.t['min'])
            tgrp.attrs.create('max',self.t['max'])
            tgrp.attrs.create('step',self.tstep[dk])
            ## init datasetss
            grp.create_group('orig')
            grp.create_group('logabs')
            grp.create_group('directional').attrs.create('threshold',1.e3*np.exp(-1.*np.power(np.arange(self.nsamples[dk])/500.,int(2))) + 100.)
            grp.create_group('sign')
            if dk == 'bes':
                grp.create_group('pop')
            ## init masks
            self.mask[dk],self.MASK[dk] = utils.getderivmask3((self.nsamples[dk],self.nfolds[dk]))
            grp.create_dataset('mask', data = self.mask[dk])
            grp.create_dataset('MASK', data = self.MASK[dk])
            ## build filters and set thresh
            self.dct_filt[dk] = utils.dct_buildfilt((2*self.nsamples[dk],self.nfolds[dk]),cut=(0,self.nsamples[dk])) # remember, we need to mirror the nfolds dimension, thus the *2
            f[dk].create_dataset('dct_filt', data=self.dct_filt[dk])
            if dk == 'bes':
                self.dct_deriv_filt[dk] = utils.dct_deriv_buildfilt((2*self.nsamples[dk],self.nfolds[dk]),cut=(0,self.nsamples[dk])) # remember, we need to mirror the nfolds dimension, thus the *2
                f[dk].create_dataset('dct_deriv_filt', data = self.dct_deriv_filt[dk])
                self.dirthresh['bes'] = np.ones((self.nsamples[dk],),dtype=np.float32)
            if dk == 'ece':
                self.dirthresh['ece'] = 1.e3*np.exp(-1.*np.power(np.arange(self.nsamples[dk])/500.,int(2))) + 100. 
            grp.create_dataset('directionThresh',data = self.dirthresh[dk])

        return self

    def getSize(self,det = 'ece'):
        return self.sz[det]

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

    def setOrig(self,f,det,c,d):
        f[det]['orig'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return self

    def setLogAbs(self,f,det,c,d):
        f[det]['logabs'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return self

    def setSignBool(self,f,det,c,d):
        f[det]['sign'].create_dataset('%02i'%c,data=d.astype(bool),dtype=bool)
        return self

    def setDirectional(self,f,det,c,d):
        f[det]['directional'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return self

    def setPop(self,f,det,c,d):
        f[det]['pop'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return self

    '''
    def setLocR(self,f,det,d):
        f[det]['loc']['R'].create_dataset('%02i'%self.chan[det],data=d,dtype=np.float16)
        return self

    def setLocTime(self,f,det,d):
        f[det]['loc']['time'].create_dataset('%02i'%self.chan[det],data=d,dtype=np.float16)
        return self

    def setLocZ(self,f,det,d):
        f[det]['loc']['Z'].create_dataset('%02i'%self.chan[det],data=d,dtype=np.float16)
        return self

    '''
