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

    def setnsamples(self,s,n):
        self.nsamples[s]=n
        return self
    def getnsamples(self,s):
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

    def initDet(self,f,detkey):
        dgrp = f.create_group(detkey)
        dgrp.attrs.create('sz',t[detkey][inds_coince[detkey]].shape[0])
        dgrp.attrs.create('nsamples',params.nsamples[detkey])
        dgrp.attrs.create('nfolds',nfolds[detkey])
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
    params.initTimes( data, dets )
    params.setExtrema(dets)
    params.t['bes'] = ((data['bes'][chans['bes'][0]]['data.time']+0.00025)*1e3).astype(int)
    params.t['min'],params.t['max'] = utils.getextrema(params.t['bes'],params.t['ece'])
    params.inds_coince['ece'] = np.where((params.t['ece']>params.t['min']) * (params.t['ece']<params.t['max']))
    params.inds_coince['bes'] = np.where((params.t['bes']>params.t['min']) * (params.t['bes']<params.t['max']))
    sz['ece'] = t['ece'][inds_coince['ece']].shape[0]
    sz['bes'] = t['bes'][inds_coince['bes']].shape[0]
    nfolds['ece'] = int(sz['ece']//params.nsamples['ece'])
    nfolds['bes'] = int(sz['bes']//params.nsamples['bes'])
    sz['ece'] = nfolds['ece']*params.nsamples['ece']
    sz['bes'] = nfolds['bes']*params.nsamples['bes']

    print('shot %i\tsz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i\ttmin,tmax = (%i,%i)'%(params.shot,sz['ece'],sz['bes'],(sz['bes']-2*sz['ece']),t['min'],t['max']))


    with h5py.File(outfile,'w') as f:
        ## working ECE first ##
        detkey = 'ece'
        initDet(f,detkey,params)
        ecegrp = f.create_group('ece')
        besgrp = f.create_group('bes')
        ecegrp.attrs.create('sz',t['ece'][inds_coince['ece']].shape[0])
        ecegrp.attrs.create('nsamples',params.nsamples['ece'])
        ecegrp.attrs.create('nfolds',nfolds['ece'])
        print('ECE nfolds*nsamples = %i * %i = %i'%(nfolds['ece'],params.nsamples['ece'],nfolds['ece']*params.nsamples['ece']))
        ecegrp.create_dataset('times',data=t['ece'][inds_coince['ece'][0][:params.nsamples['ece']*nfolds['ece']]].reshape(nfolds['ece'],nsamples['ece']).T)
        eceorig = ecegrp.create_group('orig')
        ecelogabs = ecegrp.create_group('logabs')
        ecedirectional = ecegrp.create_group('directional')
        ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.
        ecedirectional.attrs.create('threshold',1.e3*np.exp(-1.*np.power(np.arange(nsamples)/500.,int(2))) + 100.)


        mask,MASK = utils.getderivmask3((nsamples,nfolds))

        dct_filt = utils.dct_buildfilt((2*nsamples,nfolds),cut=(0,nsamples)) # remember, we need to mirror the nfolds dimension, thus the *2

        for chkey in chans_ece:
            m = re.search('^ece.{2}(\d+)$',chkey)
            if m:
                ch = np.uint8(m.group(1))
                print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),ch,nsamples,nfolds))

                if data_ece[chkey]['data.ECE'].shape[0]>1:
                    x = data_ece[chkey]['data.ECE'][inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    eceorig.create_dataset('%02i'%ch,data=x.astype(np.float16),dtype=np.float16)

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)
                    X[0,:] = 0
                    AX = np.abs(X[::2,:])
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT -= np.mean(OUT[-nsamples//4:,:])

                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                    FOUT = 2**8 * fft.idct(qout*dct_filt,axis=0)[:nsamples,:]

                    ecelogabs.create_dataset('%02i'%ch,data=FOUT.astype(np.float16),dtype=np.float16)

                    DFTOUT = np.fft.fft2(FOUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                    for i in range(len(MASK)):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real * FOUT
                    ecedirectional.create_dataset('%02i'%ch,data=NEWOUT.astype(np.float16),dtype=np.float16)



        besgrp.attrs.create('sz',t_bes[inds_bes_coince].shape[0])

        nsamples = params.nsamples_bes 
        besgrp.attrs.create('nsamples',nsamples)
        besgrp.attrs.create('nfolds',nfolds)
        print('BES nfolds*nsamples = %i * %i = %i'%(nfolds,nsamples,nfolds*nsamples))
        t = t_bes[inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        besgrp.create_dataset('times',data=t)
        besorig = besgrp.create_group('orig')
        beslogabs = besgrp.create_group('logabs')
        #besdla = besgrp.create_group('derivlogabs')
        besdirectional = besgrp.create_group('directional')
        bespop = besgrp.create_group('pop')
        #besrec = besgrp.create_group('rec')

        mask,MASK = utils.getderivmask3((nsamples,nfolds))

        #dct_filt_ELMrecover = utils.dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples//4)) 
        dct_filt_ELMpop = utils.dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 

        dct_filt_bes = utils.dct_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 
        #dct_filt_besdderiv = utils.dct_dderiv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 

        for chkey in chans_bes:
            m = re.search('^bes.{2}(\d+)',chkey)
            if m:
                ch = np.uint8(m.group(1))
                print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),m.group(1),nsamples,nfolds))
                if (data_bes[chkey]['data.BES'].shape[0]>1):
                    x = data_bes[chkey]['data.BES'][inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    besorig.create_dataset('%02i'%ch,data=x.astype(np.float16),dtype=np.float16)

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)

                    elmpop = -fft.idst(X*dct_filt_ELMpop,axis=0) 
                    elmpop -= np.mean(elmpop)
                    bespop.create_dataset('%02i'%ch,data=elmpop[:nsamples,:].astype(np.float16),dtype=np.float16)


                    AX = np.abs(X)[::2,:] 
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT -= np.mean(OUT[-nsamples//4:,:])
                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                    FOUT = 2**8 * fft.idct(qout*dct_filt_bes,axis=0)[:nsamples,:]
                    beslogabs.create_dataset('%02i'%ch,data=FOUT.astype(np.float16),dtype=np.float16)

                    DFTOUT = np.fft.fft2(FOUT/2**8)
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                    for i in range(len(MASK)):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real * FOUT
                    besdirectional.create_dataset('%02i'%ch,data=NEWOUT[:nsamples,:,:].astype(np.float16),dtype=np.float16)




        #closing with h5py.File() as f
    return
