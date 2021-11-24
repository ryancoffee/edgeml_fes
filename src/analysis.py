#!/usr/bin/python3

import h5py
import re
#import cv2
import numpy as np
from scipy.fftpack import dct,idct,idst
from scipy import fft, stats
import os
import utils


def run_shot(params):

    inpath = params.inpath
    ecefile = '%s/%i%s'%(params.inpath,params.shot,'ECE')
    besfile = '%s/%i%s'%(params.inpath,params.shot,'BES')
    outpath = params.outpath
    outfile = '%s/%s_dct.h5'%(outpath,params.shot)

    with h5py.File(outfile,'w') as f:
        ecegrp = f.create_group('ece')
        besgrp = f.create_group('bes')
        data_ece = np.load(ecefile,allow_pickle=True)
        data_bes = np.load(besfile,allow_pickle=True)
        chans_ece = list(data_ece.keys())
        chans_bes = list(data_bes.keys())
        t_ece = ((data_ece[chans_ece[0]]['data.time']+0.00025)*1e3).astype(int)
        t_bes = ((data_bes[chans_bes[0]]['data.time']+0.00025)*1e3).astype(int)
        tmin,tmax = utils.getextrema(t_bes,t_ece)
        inds_ece_coince = np.where((t_ece>tmin) * (t_ece<tmax))
        inds_bes_coince = np.where((t_bes>tmin) * (t_bes<tmax))
        sz_ece = t_ece[inds_ece_coince].shape[0]
        sz_bes = t_bes[inds_bes_coince].shape[0]
        print('shot %i\tsz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i\ttmin,tmax = (%i,%i)'%(params.shot,sz_ece,sz_bes,(sz_bes-2*sz_ece),tmin,tmax))

        ecegrp.attrs.create('sz',t_ece[inds_ece_coince].shape[0])
        nsamples = params.nsamples_ece
        nfolds = int(sz_ece/nsamples)
        ecegrp.attrs.create('nsamples',nsamples)
        ecegrp.attrs.create('nfolds',nfolds)
        print('ECE nfolds*nsamples = %i * %i = %i'%(nfolds,nsamples,nfolds*nsamples))
        t = t_ece[inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        ecegrp.create_dataset('times',data=t)
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
        nfolds = int(sz_bes/nsamples)
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
