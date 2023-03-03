#!/usr/bin/python3

import re
import numpy as np
import utils
import gc
import os
from scipy.fft import rfft,irfft

#'BESFU', 'BESSU', 'ece', 'ecevs' the new channel names in shot files

class Params:
    def __init__(self,inpath,outpath,shot,nece=512,nbes=1024):
        self.dets = {'ece':'ecevs','bes':'BESFU'}
        self.data = {}
        self.inpath = inpath
        self.outpath = outpath
        self.shot = shot
        self.nsamples = {'ece':nece, 'bes':nbes}
        self.t = {}
        self.tstep = {}
        self.maxfreq = {}
        self.inflate = {'ece':1,'bes':1}
        self.expand = {'ece':4,'bes':4}
        self.inds_coince = {}
        self.sz = {}
        self.nfolds = {}
        self.dirthresh = {}
        self.chans = {}
        self.chan = {'ece':-1,'bes':-1}
        self.mask = {}
        self.MASK = {}
        self.q_filt = {}
        self.dq_filt = {}
        self.elm_filt = {}
        self.dct_deriv_filt = {}
        self.fails = {}
        self.tid = -1
        self.method = 'fft'
        _ = [print('%s:%s'%(k,self.dets[k])) for k in self.dets.keys()]


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

    def checkFails(self,f,fails):
        for d in self.dets.keys():
            self.fails[d] = (f[d]['failed'][()]).astype(str)
        return self

    def initTimesChans(self,f): # updated for Finn ecebes_######.h5 input files.
        print('%s'%f.keys())
        times = {}
        for dk,d in self.dets.items():
            print('dk,d = %s,%s'%(dk,d))
            times[dk] = (f[d]['times'][()]*1e3+.26).astype(np.int32)
            self.chans[dk] = [k for k in f[d].keys() if re.search(d,k)]
            self.tstep[dk] = times[dk][1]-times[dk][0]
        self.t['min'] = np.max([np.min(times[d]) for d in self.dets.keys()])
        self.t['max'] = np.min([np.max(times[d]) for d in self.dets.keys()])

        for dk in self.dets.keys():
            self.inds_coince[dk] = np.where((times[dk]>self.t['min']) * (times[dk]<self.t['max']))[0]
            self.nfolds[dk] = int(self.inds_coince[dk].shape[0]//self.nsamples[dk])
            self.sz[dk] = self.nfolds[dk]*self.nsamples[dk]
        del times
        gc.collect()
        return self

    def fillData(self,f): # updated for Finn ecebes_######.h5 input files.
        for dk,d in self.dets.items():
            self.data[dk] = [(f[d][c][()]*(1<<10)).astype(np.int16) for c in self.chans[dk]]
        return self

    def setMethod(self,x='fft'):
        pattfft = re.compile('fft',re.I)
        pattdct = re.compile('d[sc]t',re.I)
        if pattfft.match(x):
            self.method = 'fft'
            return self
        elif pattdct.match(x):
            self.method = 'dct'
            return self
        print('improper method chosen, valid: fft or dct')
        return self

    def processDCT(self,h5out):
        for detkey in self.dets.keys():
            print('%s nfolds*nsamples = %i * %i = %i'%(detkey,self.nfolds[detkey],self.nsamples[detkey],self.nfolds[detkey]*self.nsamples[detkey]))
            print('len(data[%s]):\t%i'%(detkey,len(self.data[detkey])))
            ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.

            for chan,chandata in enumerate(self.data[detkey]):
                x = chandata[self.inds_coince[detkey][:self.sz[detkey]]].reshape(self.nfolds[detkey],self.nsamples[detkey]).T
                if detkey == 'bes':
                    if np.max(x)<5.:
                        x *= 2.0
                if detkey == 'ece':
                    if np.max(x)<5.:
                        x *= 6.0
                Params.setOrig(h5out,detkey,chan,data=x) # will cast as np.float16
                xx = np.row_stack((x,np.flip(x,axis=0)))
                X = dct(xx,type=2,axis=0)
                Y = dst(xx,type=2,axis=0)
                ##### UNIQUE SECTION ########
                if detkey == 'bes':
                    elmpop = -dst(X*self.dct_deriv_filt[detkey],type=3,axis=0) + dct(Y*self.dct_deriv_filt[detkey],type=3,axis=0) 
                    elmpop -= np.mean(elmpop)
                    Params.setPop(h5out,detkey,chan,data=elmpop[:self.nsamples[detkey],:])
                ##################################

                X[0,:] = 0
                
                AX = np.abs(X[::2,:])
                SX = (X[::2,:]>0)
                if np.max(AX)==0:
                    continue
                OUT = np.log2(AX+1)
                OUT -= np.mean(OUT[-self.nsamples[detkey]//4:,:])
                ##### UNIQUE SECTION ########
                if detkey == 'bes':
                    OUT *= (OUT>0)
                ##################################

                qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                FOUT = (1<<8) * fft.idct(qout*self.q_filt[detkey],axis=0)[:self.nsamples[detkey],:]

                Params.setLogAbs(h5out,detkey,chan,data=FOUT)
                Params.setSignBool(h5out,detkey,chan,data=SX)

                DFTOUT = np.fft.fft2(FOUT/(1<<8))
                NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(self.MASK[detkey])),dtype=float)
                for i in range(len(self.MASK[detkey])):
                    NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*self.MASK[detkey][i]).real * FOUT
                Params.setDirectional(h5out,detkey,chan,data=NEWOUT[:self.nsamples[detkey],:,:])
                # setting words to the 
                Params.setWords(h5out,detkey,chan,data=np.max(NEWOUT[:self.nsamples[detkey],:,:],axis=-1).astype(int),thresh=1000)

        return self

    def processFFT(self,h5out):
        offset = 1<<4
        for detkey in self.dets.keys():
            print('%s nfolds*nsamples = %i * %i = %i'%(detkey,self.nfolds[detkey],self.nsamples[detkey],self.nfolds[detkey]*self.nsamples[detkey]))
            print('len(data[%s]):\t%i'%(detkey,len(self.data[detkey])))
            ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.

            for chan,chandata in enumerate(self.data[detkey]):
                if False and detkey=='ece' and (chan<10 or chan>20): #set False to True for quickly checing on bugs
                    continue
                if True and detkey=='bes': #set False to True for quickly turning off bes
                    continue
                print('working det %s channel %s'%(detkey,chan))
                x = chandata[self.inds_coince[detkey][:self.sz[detkey]]].reshape(self.nfolds[detkey],self.nsamples[detkey]).T
                if detkey == 'bes':
                    if np.max(x)<5.:
                        x *= 2
                if detkey == 'ece':
                    if np.max(x)<5.:
                        x *= 6
                Params.setOrig(h5out,detkey,chan,data=x) # will cast as np.float16
                    
                X = rfft(np.concatenate((x,np.flip(x,axis=0)),axis=0),axis=0,norm='backward')
                self.maxfreq[detkey] = 1./(2.*self.tstep[detkey])
                if detkey=='bes':
                    ELMX = X*self.elm_filt[detkey]
                    elm_back = irfft(ELMX,norm='forward')
                    Params.setElm(h5out,detkey,chan,data=elm_back[:self.nsamples[detkey],:])
                S = np.abs(X).real
                Params.setSpect(h5out,detkey,chan,data=S)
                Q = rfft(np.concatenate((S,np.flip(S,axis=0)),axis=0),axis=0)
                Sback = irfft(Q*self.q_filt[detkey],axis=0).real.astype(float)
                dSback = irfft(Q*1j*self.dq_filt[detkey],axis=0).real.astype(float)
                #logic = (Sback[offset:self.nsamples[detkey],:]*dSback[offset:self.nsamples[detkey],:]).real.astype(float)
                logic = (dSback[offset:self.nsamples[detkey],:]).real.astype(float)
                Params.setLogic(h5out,detkey,chan,data=logic)
                e,s,ne = utils.scanedges(logic,thresh=1.5e5,expand=self.expand[detkey])
                Params.setEdges(h5out,detkey,chan,data=(e,s,ne))
        return self

    def process(self,h5out):
        if self.method=='fft':
            return self.processFFT(h5out)
        elif self.method=='dct':
            return self.processDCT(h5out)
        else:
            print('no processing method (fft/dct) specified')
        return self

    def initH5(self,f):
        if self.method=='fft':
            return self.initH5_FFT(f)
        elif self.method=='dct':
            return self.initH5_DCT(f)
        else:
            print('no method specified for initializing h5out')
        return self

    def initH5_FFT(self,f):
        self.method = 'fft'
        for dk in self.dets.keys():
            grp = f.create_group(dk)
            grp.attrs.create('nfolds',self.nfolds[dk])
            grp.attrs.create('sz',self.sz[dk])
            grp.attrs.create('nsamples',self.nsamples[dk])
            grp.attrs.create('inflate',self.inflate[dk])
            grp.attrs.create('expand',self.expand[dk])
            ## fill times
            tgrp = grp.create_group('t')
            tgrp.attrs.create('min',self.t['min'])
            tgrp.attrs.create('max',self.t['max'])
            tgrp.attrs.create('step',self.tstep[dk])
            ## init datasetss
            self.q_filt[dk] = utils.buildfilt((self.nsamples[dk]+2,self.nfolds[dk]),cut=(0,self.nsamples[dk]>>2)) # remember, we need to mirror the nsamples//2+1 dimension that results of rfft
            self.dq_filt[dk] = utils.deriv_buildfilt((self.nsamples[dk]+2,self.nfolds[dk]),cut=(0,self.nsamples[dk]>>1)) # remember, we need to mirror the nsamples//2+1 dimension that results of rfft
            f[dk].create_dataset('qfilter', data=self.q_filt[dk][:,0])
            f[dk].create_dataset('dqfilter', data=self.dq_filt[dk][:,0])
            if dk=='bes':
                grp.create_group('elm')
                self.elm_filt[dk] = utils.dderiv_buildfilt((self.nsamples[dk]+1,self.nfolds[dk]),cut=(0,self.nsamples[dk])) # remember, we need to mirror for the (2*nsamples)//2+1 in rfft 
                f[dk].create_dataset('elmfilter', data=self.elm_filt[dk][:,0])
        return self


    def initH5_DCT(self,f):
        for dk in self.dets.keys():
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
            self.q_filt[dk] = utils.buildfilt((2*self.nsamples[dk],self.nfolds[dk]),cut=(0,self.nsamples[dk])) # remember, 2* nsamples since mirroring
            f[dk].create_dataset('q_filt', data=self.q_filt[dk])
            if dk == 'bes':
                self.dct_deriv_filt[dk] = utils.deriv_buildfilt((2*self.nsamples[dk],self.nfolds[dk]),cut=(0,self.nsamples[dk])) # remember, 2* nsamples since mirroring
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

    @classmethod
    def setOrig(cls,f,det,c,data):
        m = re.compile('orig')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('orig')
        f[det]['orig'].create_dataset('%02i'%c,data=data.astype(np.float16),dtype=np.float16)
        return cls

    @classmethod
    def setSpect(cls,f,det,c,data):
        m = re.compile('spect')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('spect')
        f[det]['spect'].create_dataset('%02i'%c,data=data.astype(np.float16),dtype=np.float16)
        return cls

    @classmethod
    def setLogic(cls,f,det,c,data):
        m = re.compile('logic')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('logic')
        f[det]['logic'].create_dataset('%02i'%c,data=data,dtype=float)
        return cls

    @classmethod
    def setElm(cls,f,det,c,data):
        m = re.compile('elm')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('elm')
        f[det]['elm'].create_dataset('%02i'%c,data=data.astype(np.float16),dtype=np.float16)
        return cls

    @classmethod
    def setEdges(cls,f,det,c,data):
        ematch = re.compile('edges')
        lmatch = re.compile('locations')
        smatch = re.compile('slopes')
        nmatch = re.compile('nedges')
        if not np.any([ematch.match(k) for k in f[det].keys()]):
            f[det].create_group('edges')
        if not np.any([lmatch.match(k) for k in f[det]['edges'].keys()]):
            f[det]['edges'].create_group('locations')
        if not np.any([smatch.match(k) for k in f[det]['edges'].keys()]):
            f[det]['edges'].create_group('slopes')
        if not np.any([nmatch.match(k) for k in f[det]['edges'].keys()]):
            f[det]['edges'].create_group('nedges')

        f[det]['edges']['locations'].create_dataset('%02i'%c,data=np.array(data[0]).astype(np.uint32),dtype=np.uint32)
        f[det]['edges']['slopes'].create_dataset('%02i'%c,data=np.array(data[1]).astype(np.float16),dtype=np.float16)
        f[det]['edges']['nedges'].create_dataset('%02i'%c,data=np.array(data[2]).astype(np.uint8),dtype=np.uint8)
        return cls

    @classmethod
    def setLogAbs(cls,f,det,c,d):
        m = re.compile('logabs')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('logabs')
        f[det]['logabs'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return cls

    @classmethod
    def setSignBool(cls,f,det,c,d):
        m = re.compile('sign')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('sign')
        f[det]['sign'].create_dataset('%02i'%c,data=d.astype(bool),dtype=bool)
        return cls

    @classmethod
    def setDirectional(cls,f,det,c,d):
        m = re.compile('directional')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('directional')
        f[det]['directional'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return cls

    @classmethod
    def setPop(cls,f,det,c,d):
        m = re.compile('pop')
        if not np.any([m.match(k) for k in f[det].keys()]):
            f[det].create_group('pop')
        f[det]['pop'].create_dataset('%02i'%c,data=d.astype(np.float16),dtype=np.float16)
        return cls

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
