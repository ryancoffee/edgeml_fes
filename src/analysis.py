#!/usr/bin/python3

import h5py
import re
#import cv2
import numpy as np
from scipy.fftpack import dct,idct,idst
from scipy import fft, stats
import os
import utils

#'BESFU', 'BESSU', 'ece', 'ecevs' the new channel names in shot files

def run_shot(params):

    inpath = params.inpath
    outpath = params.outpath
    outfile = '%s/%s_dct.h5'%(outpath,params.shot)

    filename = '%s/ecebes_%06i.h5'%(params.inpath,params.shot)
    dets = {'ece':'ecevs','bes':'BESFU'}
    data = {}

    with h5py.File(filename,'r') as f:
        params.initTimesChans(f,dets)
        data = params.fillData(f,dets,data)

    print('pid%i\tshot %i\tsz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i\ttmin,tmax = (%i,%i)'%(params.getProcID(),params.shot,params.sz['ece'],params.sz['bes'],(params.sz['bes']-2*params.sz['ece']),params.t['min'],params.t['max']))

    return
    with h5py.File(outfile,'w') as f:
        #################### ECE section #########################3#

        detkey = 'ece'
        params.initH5det(f,detkey).fillH5times(f,detkey).setThresh(f,detkey)
        print('ECE nfolds*nsamples = %i * %i = %i'%(params.nfolds['ece'],params.nsamples['ece'],params.nfolds['ece']*params.nsamples['ece']))
        params.initH5datasets(f,detkey).initMasks(f,detkey).buildFilt(f,detkey)
        ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.

        for chkey in params.chans[detkey]:
            if data[detkey][chkey].shape[0]>1:
                    x = data[detkey][chkey]['data.ECE'][params.inds_coince[detkey][0][:params.sz[detkey]]].reshape(params.nfolds[detkey],params.nsamples[detkey]).T
                    params.setOrig(f,detkey,x) # will cast as np.float16

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)
                    X[0,:] = 0
                    AX = np.abs(X[::2,:])
                    SX = (X[::2,:]>0)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT -= np.mean(OUT[-params.nsamples[detkey]//4:,:])

                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                    FOUT = 2**8 * fft.idct(qout*params.dct_filt[detkey],axis=0)[:params.nsamples[detkey],:]

                    params.setLogAbs(f,detkey,FOUT)
                    params.setSignBool(f,detkey,SX)
                    params.setLocR(f,detkey,data[detkey][chkey]['loc.R'])
                    params.setLocTime(f,detkey,data[detkey][chkey]['loc.time'])


                    DFTOUT = np.fft.fft2(FOUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(params.MASK[detkey])),dtype=float)
                    for i in range(len(params.MASK[detkey])):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*params.MASK[detkey][i]).real * FOUT
                    params.setDirectional(f,detkey,NEWOUT[:params.nsamples[detkey],:,:])



        ############### BES section ################


        detkey = 'bes'

        params.initH5det(f,detkey).fillH5times(f,detkey).setThresh(f,detkey)
        print('BES nfolds*nsamples = %i * %i = %i'%(params.nfolds['bes'],params.nsamples['bes'],params.nfolds['bes']*params.nsamples['bes']))
        params.initH5datasets(f,detkey).initMasks(f,detkey).buildFilt(f,detkey)
        ## threshold for ecedirectional max before zero crossing for frequencies th = 1e3*exp(-(x/500)**2)+100 where x is in index units as here.


        print('BES nfolds*nsamples = %i * %i = %i'%(params.nfolds[detkey],params.nsamples[detkey],params.sz[detkey]))


        for chkey in params.chans[detkey]:
            if params.goodChanKey(chkey,detkey):
                if data[detkey][chkey]['data.BES'].shape[0]>1:
                    x = data[detkey][chkey]['data.BES'][params.inds_coince[detkey][0][:params.sz[detkey]]].reshape(params.nfolds[detkey],params.nsamples[detkey]).T
                    params.setOrig(f,detkey,x) # will cast as np.float16

                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    X = fft.dct(xx,axis=0)

                    ##### UNIQUE SECTION ########
                    elmpop = -fft.idst(X*params.dct_deriv_filt[detkey],axis=0) 
                    elmpop -= np.mean(elmpop)
                    params.setPop(f,detkey,elmpop[:params.nsamples[detkey],:])
                    ##################################

                    X[0,:] = 0 ####################### this also was only in ECE, but adding to BES for consistency... let's see.
                    AX = np.abs(X[::2,:])
                    SX = (X[::2,:]>0)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT -= np.mean(OUT[-params.nsamples[detkey]//4:,:])
                    OUT *= (OUT>0)

                    qout = fft.dct(np.row_stack((OUT,np.flip(OUT,axis=0))),axis=0)
                    FOUT = 2**8 * fft.idct(qout*params.dct_filt[detkey],axis=0)[:params.nsamples[detkey],:]

                    params.setLogAbs(f,detkey,FOUT)
                    params.setSignBool(f,detkey,SX)
                    
                    chnum = params.getChan(detkey)
                    params.setLocR(f,detkey,data[detkey]['loc.R'][chnum])
                    params.setLocZ(f,detkey,data[detkey]['loc.Z'][chnum])


                    DFTOUT = np.fft.fft2(FOUT/(2**8))
                    NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(params.MASK[detkey])),dtype=float)
                    for i in range(len(params.MASK[detkey])):
                        NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*params.MASK[detkey][i]).real * FOUT
                    params.setDirectional(f,detkey,NEWOUT[:params.nsamples[detkey],:,:])

        #closing with h5py.File() as f
    return
