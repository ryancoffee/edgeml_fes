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


        mask,MASK = utils.getmask3((nsamples,nfolds))
        #mask,MASK = utils.getmask_deep((nsamples,nfolds))
        filt = utils.buildfilt(nsamples,nfolds,cutoff=.10)# by inspection this looks good for BG subtraction on ECE images
        dct_filt2d = utils.dct_buildfilt2d((nsamples,nfolds*2),cutoffs=(nsamples//16,nfolds//4)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt = utils.dct_buildfilt((nsamples,nfolds),cut=(0,64)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt_ecederiv = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(8,3*nsamples//4)) 
        dct_filt_ece = utils.dct_buildfilt((nsamples,nfolds),cut=(0,4*nsamples//4)) 

        for chkey in chans_ece:
            m = re.search('^ece.{2}(\d+)$',chkey)
            if m:
                ch = np.uint8(m.group(1))
                print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),ch,nsamples,nfolds))

                if data_ece[chkey]['data.ECE'].shape[0]>1:
                    x = data_ece[chkey]['data.ECE'][inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    eceorig.create_dataset('%02i'%ch,data=x.astype(np.float16),dtype=np.float16)

                    #X = np.fft.fft(x,axis=0) #np.row_stack((x,np.flipud(x))),axis=0)
                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)
                    X[0,:] = 0
                    AX = np.abs(X[::2,:])
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt,axis = 0)
                    OUT -= BG
                    #OUT *= (OUT>0)

                    ecelogabs.create_dataset('%02i'%ch,data=OUT.astype(np.int16),dtype=np.int16)


                    '''
                    qout = fft.dct(OUT,axis=0)
                    DOUT = fft.idct(qout*dct_filt_ece,axis=0)
                    for w in range(DOUT.shape[1]):
                        h,b = np.histogram(DOUT[:,w],bins=100)
                        j = np.argmax(h)
                        DOUT -= b[j]

                    DOUT *= (2**15-1)/np.max(DOUT)

                    OUT *= (2**15-1)/np.max(OUT)
                    grp_ece.create_dataset('%s_la'%m.group(1),data=OUT[:nsamples,:nfolds].astype(np.uint16))
                    grp_ece.create_dataset('%s_laf'%m.group(1),data=DOUT[:nsamples,:nfolds].astype(np.uint16))
                    grp_ece.create_dataset('%s_dct_la'%m.group(1),data=qout[:nsamples:2,:].astype(np.int16))
                    '''


                    DFTOUT = np.fft.fft2(OUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=np.float16)
                    for i in range(len(MASK)):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                    ecedirectional.create_dataset('%02i'%ch,data=NEWOUT[:nsamples,:,:].astype(np.int16))



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
        besddla = besgrp.create_group('dderivlogabs')
        besdirectional = besgrp.create_group('directional')
        bespop = besgrp.create_group('pop')
        besrec = besgrp.create_group('rec')

        mask,MASK = utils.getmask3((nsamples,nfolds))

        dct_filt_ELMrecover = utils.dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples//4)) 
        dct_filt_ELMpop = utils.dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 
        #dct_filt_bes = utils.dct_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//8)) 
        #dct_filt_besderiv = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//4)) 
        #dct_filt_besderiv_fat = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//4)) 
        #dct_filt_besdderiv_mask = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//4)) 

        dct_filt_besdderiv = utils.dct_dderiv_buildfilt((nsamples,nfolds),cut=(0,nsamples)) 

        for chkey in chans_bes:
            m = re.search('^bes.{2}(\d+)',chkey)
            if m:
                ch = np.uint8(m.group(1))
                print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),m.group(1),nsamples,nfolds))
                if (data_bes[chkey]['data.BES'].shape[0]>1):
                    x = data_bes[ch]['data.BES'][inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    besorig.create_dataset('%02i'%ch,data=x.astype(np.float16),dtype=np.float16)

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    #X = np.fft.fft(x,axis=0)
                    X = fft.dct(xx,axis=0)

                    elmrec = -fft.idst(X*dct_filt_ELMrecover,axis=0)
                    elmpop = -fft.idst(X*dct_filt_ELMpop,axis=0) 

                    elmrec -= np.mean(elmrec)
                    besrec.create_group('%02i'%ch,data=elmrec[:nsamples,:].astype(np.float16),dtype=np.float16)
                    elmpop -= np.mean(elmpop)
                    bespop.create_group('%02i'%ch,data=elmpop[:nsamples,:].astype(np.float16),dtype=np.float16)

                    #elmrec *= (2**14-1)/np.max(np.abs(elmrec))
                    #elmpop *= (2**14-1)/np.max(np.abs(elmpop))

                    AX = np.abs(X)[::2,:] 
                    #PX = np.angle(X)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1) 
                    beslogabs.create_dataset('%02i'%ch,data=OUT.astype(np.float16),dtype=np.float16)

                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)  
                    DDOUT = fft.idct(qout*dct_filt_besdderiv,axis=0) # Whew... careful...this is the idct of somtething quadratic in FREQ
                    besddla.create_dataset('%02i'%ch,data=DDOUT.astype(np.float16),dtype=np.float16)
                    #DOUT -= np.mean(DOUT[nsamples//4:3*nsamples//4,:])
                    #DOUT *= (2**14-1)/np.max(DOUT)
                    #DOUT *= (DOUT>0)


                    ### BG subtraction doesn't work for BES since ELM pops would then be excluded
                    #BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt_bes ,axis=0)
                    #OUT -= BG
                    #OUT *= (2**14-1)/np.max(OUT[3:-2,:])
                    #grp_bes.create_dataset('%s_la'%m.group(1),data=OUT[:nsamples,:].astype(np.int16))
                    #grp_bes.create_dataset('%s_laf'%m.group(1),data=DOUT[:nsamples,:].astype(np.int16)) # laf == logabsfilt
                    #grp_bes.create_dataset('%s_dct_la'%m.group(1),data=qout[:nsamples:2,:].astype(np.int16))
                    #x -= np.mean(x)
                    #x *= (2**15-1 )/np.max(x) 
                    #grp_bes.create_dataset('%s_elm'%m.group(1),data=x.T.reshape(-1).astype(np.int16))
                    #grp_bes.create_dataset('%s_elmpop'%m.group(1),data=elmpop[:nsamples,:].T.reshape(-1).astype(np.int16))
                    #grp_bes.create_dataset('%s_elmrec'%m.group(1),data=elmrec[:nsamples,:].T.reshape(-1).astype(np.int16))

                    ## In liew of BG subtraction, what if we instead use the heavy filter version of peak finding from the waveform analysis applied here to the spectrum axis=0
                    # operate on DOUT

                    DFTOUT = np.fft.fft2(DDOUT)
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                    for i in range(len(MASK)):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                        NEWOUT[:,:,i] -= np.mean(NEWOUT[:,:,i])
                    besdirectional.create_dataset('%02i'%ch,data=NEWOUT[:nsamples,:,:].astype(np.float16),dtype=np.float16)




        #closing with h5py.File() as f
    return
