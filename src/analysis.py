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

        nsamples = params.nsamples_ece #1024
        nfolds = int(sz_ece//nsamples)
        print('ECE nfolds*nsamples = %i * %i = %i'%(nfolds,nsamples,nfolds*nsamples))
        t = t_ece[inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        f.create_dataset('times_ece',data=t)
        grp_ece = f.create_group('ece')


        mask,MASK = utils.getmask3((nsamples,nfolds))
        #mask,MASK = utils.getmask_deep((nsamples,nfolds))
        filt = utils.buildfilt(nsamples,nfolds,cutoff=.10)# by inspection this looks good for BG subtraction on ECE images
        dct_filt2d = utils.dct_buildfilt2d((nsamples,nfolds*2),cutoffs=(nsamples//16,nfolds//4)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt = utils.dct_buildfilt((nsamples,nfolds),cut=(0,64)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt_ecederiv = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(8,3*nsamples//4)) 
        dct_filt_ece = utils.dct_buildfilt((nsamples,nfolds),cut=(0,4*nsamples//4)) 

        for ch in chans_ece:
            m = re.search('^ece.{2}(\d+)$',ch)
            if m:
                print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),m.group(1),nsamples,nfolds))
                if data_ece[ch]['data.ECE'].shape[0]>1:
                    x = data_ece[ch]['data.ECE'][inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    #X = np.fft.fft(x,axis=0) #np.row_stack((x,np.flipud(x))),axis=0)
                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)
                    AX = np.abs(X[::2,:])
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt,axis = 0)
                    OUT -= BG
                    OUT[0,:] = 0
                    OUT *= (OUT>0)


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


                    DFTOUT = np.fft.fft2(DOUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                    for i in range(len(MASK)):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                    grp_ece.create_dataset('%s_directional'%(m.group(1)),data=NEWOUT[:nsamples,:,:].astype(np.int16))



                    '''
                    if False:
                        cv2.imwrite('./figs/gray/ece/shot%i/logabs_ece_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),(255-OUT[:,:2*(OUT.shape[1]//2)]//2**8).astype(np.uint8))
                        cv2.imwrite('./figs/gray/ece/shot%i/logabsfilt_ece_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),(255-DOUT//2**8).astype(np.uint8))

                    # OK, the powerspectrum here is necessarily symmetric in axis0, and the phase is neccesarily anti-symmetric.
                    # We should be able to use the discrete cosine and sine transforms.

                    if False:
                        cv2.imwrite('./figs/color/ece_shot%i_ch%s_color1.png'%(params.shot,m.group(1)),(NEWOUT//2**8).astype(np.uint8)[:,:,:3])
                        cv2.imwrite('./figs/color/ece_shot%i_ch%s_color2.png'%(params.shot,m.group(1)),(NEWOUT//2**8).astype(np.uint8)[:,:,3:])
                    '''

        nsamples = params.nsamples_bes 
        print('BES nfolds*nsamples = %i * %i = %i'%(nfolds,nsamples,nfolds*nsamples))
        t = t_bes[inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        f.create_dataset('times_bes',data=t)
        mask,MASK = utils.getmask3((nsamples,nfolds))

        dct_filt_ELMrecover = utils.dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples//4)) 
        dct_filt_ELMpop = utils.dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 
        dct_filt_bes = utils.dct_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//8)) 
        dct_filt_besderiv = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//4)) 
        dct_filt_besderiv_fat = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//4)) 
        dct_filt_besdderiv_mask = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,1*nsamples//4)) 
        dct_filt_besdderiv = utils.dct_deriv_buildfilt((nsamples,nfolds),cut=(0,nsamples)) 

        grp_bes = f.create_group('bes')
        for ch in chans_bes:
            m = re.search('^bes.{2}(\d+)',ch)
            if m:
                print('pid%i\t%s\t%s\t%ix%i'%(os.getpid(),m.group(0),m.group(1),nsamples,nfolds))
                if (data_bes[ch]['data.BES'].shape[0]>1):
                    x = data_bes[ch]['data.BES'][inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    #X = np.fft.fft(x,axis=0)
                    X = fft.dct(xx,axis=0)
                    elmrec = -fft.idst(X*dct_filt_ELMrecover,axis=0)
                    elmpop = -fft.idst(X*dct_filt_ELMpop,axis=0) 

                    elmrec -= np.mean(elmrec)
                    elmrec *= (2**14-1)/np.max(np.abs(elmrec))

                    elmpop -= np.mean(elmpop)
                    elmpop *= (2**14-1)/np.max(np.abs(elmpop))

                    AX = np.abs(X)[::2,:] ## AX is symmetric along axis=0 since it is the abs of dct coefficients i.e. root(power spectrum).
                    #PX = np.angle(X)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1) ## again, this is symmetric along axis=0 since it is the log(root power spectrum + 1)

                    qout = fft.dct(OUT,axis=0)  ## OUT is still symmetric about axis=0, BUT dct_filt_besderiv probably should be not... explore here, there maybe a bug
                                                ## qout (q for q-frency of the cepstrum)
                    #DOUT = fft.idct(qout*dct_filt_besdderiv_mask,axis=0)
                    #DOUT = np.tanh(DOUT/np.std(DOUT)/2)
                    DOUT = fft.idct(qout*dct_filt_besdderiv,axis=0) 
                    DOUT -= np.mean(DOUT[nsamples//4:3*nsamples//4,:])
                    DOUT *= (2**14-1)/np.max(DOUT)
                    DOUT *= (DOUT>0)


                    ### BG subtraction doesn't work for BES since ELM pops would then be excluded
                    #BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt_bes ,axis=0)
                    #OUT -= BG
                    OUT *= (2**14-1)/np.max(OUT[3:-2,:])
                    grp_bes.create_dataset('%s_la'%m.group(1),data=OUT[:nsamples,:].astype(np.int16))
                    grp_bes.create_dataset('%s_laf'%m.group(1),data=DOUT[:nsamples,:].astype(np.int16)) # laf == logabsfilt
                    grp_bes.create_dataset('%s_dct_la'%m.group(1),data=qout[:nsamples:2,:].astype(np.int16))
                    x -= np.mean(x)
                    x *= (2**15-1 )/np.max(x) 
                    grp_bes.create_dataset('%s_elm'%m.group(1),data=x.T.reshape(-1).astype(np.int16))
                    grp_bes.create_dataset('%s_elmpop'%m.group(1),data=elmpop[:nsamples,:].T.reshape(-1).astype(np.int16))
                    grp_bes.create_dataset('%s_elmrec'%m.group(1),data=elmrec[:nsamples,:].T.reshape(-1).astype(np.int16))

                    ## In liew of BG subtraction, what if we instead use the heavy filter version of peak finding from the waveform analysis applied here to the spectrum axis=0
                    # operate on DOUT

                    DFTOUT = np.fft.fft2(DOUT)
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                    for i in range(len(MASK)):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                        NEWOUT[:,:,i] -= np.mean(NEWOUT[:,:,i])
                    grp_bes.create_dataset('%s_directional'%(m.group(1)),data=NEWOUT[:nsamples,:,:].astype(np.int16))



                    ##

                    '''
                    if False:
                        imout = np.full((nsamples,nfolds,3),128,dtype=np.uint8)
                        imout[:,:,2] = np.flip(elmpop[:nsamples,:]//2**8+128,axis=0).astype(np.uint8)
                        imout[:,:,1] = np.flip(elmpop[:nsamples,:]//2**8+128,axis=0).astype(np.uint8)
                        imout[:,:,0] = np.flip(elmrec[:nsamples,:]//2**8+128,axis=0).astype(np.uint8)

                        #cv2.imwrite('./figs/gray/bes/shot%i/logabs_bes_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),(255-OUT[:,:2*(OUT.shape[1]//2)]//2**7).astype(np.uint8))
                        cv2.imwrite('./figs/gray/bes/shot%i/logabs_bes_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),np.flip(255-OUT[::2,:]//2**8,axis=0).astype(np.uint8))
                        cv2.imwrite('./figs/gray/bes/shot%i/logabsfilt_bes_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),np.flip(255-DOUT[::2,:]//2**8,axis=0).astype(np.uint8))
                        cv2.imwrite('./figs/color/bes/shot%i/elm_bes_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),imout)
                        x -= np.min(x)
                        x *= 255/np.max(x)
                        cv2.imwrite('./figs/gray/bes/shot%i/straight_bes_shot%i_ch%s.png'%(params.shot,params.shot,m.group(1)),np.flip(x[:nsamples,:],axis=0).astype(np.uint8))




                    if False:
                        DFTOUT = np.fft.fft2(OUT)
                        NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                        for i in range(len(MASK)):
                            NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                        NEWOUT *= (NEWOUT>0)
                        grp_bes.create_dataset('%s_directional'%(m.group(1)),data=(NEWOUT[:nsamples//2,:,:]).astype(np.uint16))
                        cv2.imwrite('./figs/color/bes_shot%i_ch%s_color1.png'%(params.shot,m.group(1)),(255-NEWOUT//2**9).astype(np.uint8)[:,:,[0,1,2]])
                        cv2.imwrite('./figs/color/bes_shot%i_ch%s_color2.png'%(params.shot,m.group(1)),(255-NEWOUT//2**9).astype(np.uint8)[:,:,[2,3,3]])

                    '''
        #closing with h5py.File() as f
    return
