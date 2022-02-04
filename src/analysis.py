#!/usr/bin/python3

import h5py
import re
#import cv2
import numpy as np
from scipy.fftpack import dct,idct,idst
from scipy import fft, stats
import os
import utils

class Params:
    def __init__(self,inpath,outpath,shot,nece=512,nbes=1024):
        self.inpath = inpath
        self.outpath = outpath
        self.shot = shot
        self.nsamples = {'ece':nece, 'bes':nbes}
        self.t = {}
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

    def setNsamples(self,s,n):
        self.nsamples[s]=n
        return self
    def getNsamples(self,s):
        return self.nsamples[s]

    def initTimes(self,data,dets=['ece','bes']):
        for det in dets:
            self.chans[det] = list(data[det].keys())
            self.t[det] = ((data[det][chans[det][0]]['data.time'] + 0.00025)*1e3).astype(int)
        return self

    def setExtrema(self,dets):
        self.t['min'] = np.max([np.min(self.t[d]) for d in dets]))
        self.t['max'] = np.min([np.max(self.t[d]) for d in dets]))
        return self

    def initH5det(self,f,detkey):
        dgrp = f.create_group(detkey)
        dgrp.attrs.create('nfolds',nfolds[detkey])
        dgrp.attrs.create('sz',self.sz[detkey])
        dgrp.attrs.create('nsamples',self.nsamples[detkey])
        return self

    def fillH5times(self,f,detkey):
        dgrp = f[detkey]
        dgrp.create_dataset('times',data=self.t[detkey][self.inds_coince[detkey][0][:self.sz[detkey]]].reshape(self.nfolds[detkey],self.nsamples[detkey]).T)
        return self

    def fillIndsCoince(self,dets = ['ece','bes']):
        for det in dets:
            self.inds_coince[det] = np.where((self.t[det]>self.t['min']) * (self.t[det]<self.t['max']))
            self.sz[det] = self.t[det][self.inds_coince[det]].shape[0]
        return self

    def setFolds(self,dets = ['ece','bes']):
        for det in dets:
            self.nfolds[det] = int(self.sz[det]//self.nsamples[det])
            self.sz[det] = self.nfolds[det]*self.nsamples[det]
        return self

    def getSize(self,det = 'ece'):
        return self.sz[det]

    def setThresh(self,det = 'ece'):
        if det == 'ece':
            self.dirthresh[det] = 1.e3*np.exp(-1.*np.power(np.arange(self.nsamples[detkey])/500.,int(2))) + 100. )
        if det == 'bes':
            self.dirthresh[det] = np.ones((self.nsamples[detkey],),dtype=np.float32)
        return self

    def initH5datasets(self,f,detkey):
        if detkey == 'ece':
            ecegrp = f[detkey]
            eceorig = ecegrp.create_group('orig')
            ecelogabs = ecegrp.create_group('logabs')
            ecedirectional = ecegrp.create_group('directional').attrs.create('threshold',1.e3*np.exp(-1.*np.power(np.arange(nsamples)/500.,int(2))) + 100.)
        if defkey == 'bes':
            besgrp = f[detkey]
            besorig = besgrp.create_group('orig')
            beslogabs = besgrp.create_group('logabs')
            besdirectional = besgrp.create_group('directional').attrs.create('threshold',1.e3*np.exp(-1.*np.power(np.arange(nsamples)/500.,int(2))) + 100.)
            bespop = besgrp.create_group('pop')
        return self

    def initChans(self,det,data):
        self.chans[det] = list(data[det].keys())
        self.chan[det] = -1
        return self


    def initMasks(self,det):
        self.mask[det],self.MASK[det] = utils.getderivmask3((self.nsamples[det],self.nfolds[det]))
        return self

    def buildFilt(self,det):
        self.dct_filt[det] = utils.dct_buildfilt((2*self.nsamples[det],self.nfolds[det]),cut=(0,self.nsamples[det])) # remember, we need to mirror the nfolds dimension, thus the *2
        if det == 'bes':
            self.dct_deriv_filt[det] = utils.dct_deriv_buildfilt((2*self.nsamples[det],self.nfolds[det]),cut=(0,self.nsamples[det])) # remember, we need to mirror the nfolds dimension, thus the *2
        return self

    def goodChanKey(self,key,det):
        m = re.search('^ece.{2}(\d+)$',chkey)
        if not m:
            self.chan[det] = -1
            return False
        self.chan[det] = np.uint8(m.group(1))
        print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),self.chan[det],self.nsamples[det],self.nfolds[det]))
        return True

    def setOrig(self,f,det,d):
        f[det]['orig'].create_dataset('%02i'%self.chan[detkey],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setLogAbs(self,f,det,d):
        f[det]['logabs'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setDirectional(self,f,det,d):
        f[det]['directional'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

    def setPop(self,f,det,d):
        f[det]['pop'].create_dataset('%02i'%self.chan[det],data=d.astype(np.float16),dtype=np.float16)
        return self

def run_shot(params):

    inpath = params.inpath
    ecefile = '%s/%i%s'%(params.inpath,params.shot,'ECE')
    besfile = '%s/%i%s'%(params.inpath,params.shot,'BES')
    outpath = params.outpath
    outfile = '%s/%s_dct.h5'%(outpath,params.shot)

    data = {}
    t = {}
    inds_coince = {}
    sz = {}
    nfolds = {}
    data['ece'] = np.load(ecefile,allow_pickle=True)
    data['bes'] = np.load(besfile,allow_pickle=True)
    dets = ['ece','bes']
    params.initChans(data,dets)
    params.initTimes( data, dets ).setExtrema(dets)
    params.fillIndsCoince(dets).setFolds(dets)
    for det in dets:
        params.initChans(det,data[det])

    print('shot %i\tsz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i\ttmin,tmax = (%i,%i)'%(params.shot,params.sz['ece'],params.sz['bes'],(params.sz['bes']-2*params.sz['ece']),params.t['min'],params.t['max']))


    with h5py.File(outfile,'w') as f:
        #################### ECE section #########################3#
        detkey = 'ece'

        params.initH5det(f,detkey).fillH5times(f,detkey).setThresh(detkey)
        print('ECE nfolds*nsamples = %i * %i = %i'%(params.nfolds['ece'],params.nsamples['ece'],params.nfolds['ece']*params.nsamples['ece']))
        params.initH5datasets(detkey).initMasks(detkey).buildFilt(detkey)
        ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.

        for chkey in params.chans[detkey]:
            if params.goodChanKey(chkey,detkey):
                if data[detkey][chkey]['data.ECE'].shape[0]>1:
                    x = data[detkey][chkey]['data.ECE'][params[detkey].inds_coince[0][:params.sz[detkey]]].reshape(params.nfolds[detkey],params.nsamples[detkey]).T
                    params.setOrig[detkey](f,detkey,x) # will cast as np.float16

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)
                    X[0,:] = 0
                    AX = np.abs(X[::2,:])
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT -= np.mean(OUT[-params.nsamples[detkey]//4:,:])

                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                    FOUT = 2**8 * fft.idct(qout*params.dct_filt[detkey],axis=0)[:nsamples,:]

                    params.setLogAbs[detkey](f,detkey,FOUT)


                    DFTOUT = np.fft.fft2(FOUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(params.MASK[detkey])),dtype=float)
                    for i in range(len(params.MASK[detkey])):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real * FOUT
                    params.setDirectional[detkey](f,detkey,NEWOUT[:params.nsamples[det],:,:])




        ############### BES section ################

        detkey = 'bes'

        params.initH5det(f,detkey).fillH5times(f,detkey).setThresh(detkey)
        print('BES nfolds*nsamples = %i * %i = %i'%(params.nfolds['bes'],params.nsamples['bes'],params.nfolds['bes']*params.nsamples['bes']))
        params.initH5datasets(detkey).initMasks(detkey).buildFilt(detkey)
        ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.


        print('BES nfolds*nsamples = %i * %i = %i'%(params.nfolds[detkey],params.nsamples[detkey],params.sz[detkey]))

        for chkey in params.chans[detkey]:
            if params.goodChanKey(chkey,detkey):
                if data[detkey][chkey]['data.BES'].shape[0]>1:
                    x = data[detkey][chkey]['data.BES'][params[detkey].inds_coince[0][:params.sz[detkey]]].reshape(params.nfolds[detkey],params.nsamples[detkey]).T
                    params.setOrig[detkey](f,detkey,x) # will cast as np.float16

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)

                    ##### ONLY UNIQUE SECTION ########
                    elmpop = -fft.idst(X*params.dct_deriv_filt[detkey],axis=0) 
                    elmpop -= np.mean(elmpop)
                    params.setPop[detkey](f,detkey,elmpop[:params.nsamples[detkey],:])
                    ##################################

                    X[0,:] = 0 ####################### this also was only in ECE, but adding to BES for consistency... let's see.
                    AX = np.abs(X[::2,:])
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT -= np.mean(OUT[-params.nsamples[detkey]//4:,:])

                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                    FOUT = 2**8 * fft.idct(qout*params.dct_filt[detkey],axis=0)[:nsamples,:]

                    params.setLogAbs[detkey](f,detkey,FOUT)


                    DFTOUT = np.fft.fft2(FOUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(params.MASK[detkey])),dtype=float)
                    for i in range(len(params.MASK[detkey])):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*params.MASK[detkey][i]).real * FOUT
                    params.setDirectional[detkey](f,detkey,NEWOUT[:params.nsamples[detkey],:,:])

        #closing with h5py.File() as f
    return
