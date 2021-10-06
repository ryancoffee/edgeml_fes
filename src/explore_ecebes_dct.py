#!/sdf/sw/images/slac-ml/20200227.0/bin/python3

#/usr/bin/python3
#!/home/rc8936/.conda/envs/rnc_fes/bin/python

import numpy as np
import h5py
import sys
import re
#import cv2
import os
import multiprocessing as mp
import time
from joblib import Parallel, delayed
from scipy import fft, stats


def tanh(x,w):
    return 0.5*(1.+np.tanh(x/w))

def relu(x):
    return x * (x>0)

def qfilt(shape,ilim):
    mask = [np.zeros(shape,dtype=float) for k in range(3)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(3)]
    ilim = int(5)
    width = float(ilim)
    x = np.tile(np.arange(5).astype(float)/width,(shape[1],1)).T
    mask[0][:ilim,:] = 0.5*(1.+np.sin(x*np.pi))
    mask[1][:ilim,:] = -np.cos(x*np.pi)*0.5*(1.+np.sin(x*np.pi))
    mask[2][:ilim,:] = -np.cos(x*2*np.pi)*0.5*(1.+np.sin(x*np.pi))
    for i in range(len(mask)):
        mask[i] = np.roll(mask[i],-ilim//2,axis=0)
        MASK[i] = np.fft.fft(mask[i],axis=0)
    return mask,MASK

def getmask_deep(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(12)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(12)]
    mask[0][:3,0::2] = 0.333
    x=np.eye(3,3)
    xu = np.triu(np.roll(x,-1,axis=0))
    xu += np.flip(np.flip(xu,axis=0),axis=1)
    mask[1][:3,:3] =0.333*xu.copy()
    mask[2][0:2,:] = .333
    mask[3][:3,:3] = 0.333*xu.T.copy()
    mask[4][:3,0::2] = -0.666
    mask[5][:3,:3] = -.666*xu.copy()
    mask[6][0::2,:3] = -0.666
    mask[7][:3,:3] = -.666*xu.T.copy()
    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-1,axis=0),-1,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def getmask(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(4)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(4)]
    mask[0][:3,1] = 1.
    mask[1][:3,:3] = np.eye(3)
    mask[2][1,:3] = 1.
    mask[3][:3,:3] = np.fliplr(np.eye(3))
    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-1,axis=0),-1,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def dct_deriv_buildfilt(shape,cut=(0,256)):
    cuton = cut[0]
    cutoff = cut[1]
    filt = np.zeros(shape[0],dtype=float)
    if cut[0] > 0:
        cuton = cut[0]
        FREQ = np.arange(int(cuton),int(cutoff))
        filt[int(cuton):int(cutoff)] = FREQ*0.5*(1.+np.sin(np.pi*np.arange(int(cutoff-cuton))/float(cutoff-cuton)))
    else:
        FREQ = np.arange(int(cutoff))
        filt[:int(cutoff)] = FREQ*0.5*(1.+np.cos(np.pi*FREQ/float(cutoff)))
    return np.tile(filt,(shape[1],1)).T

def dct_buildfilt2d(shp,cutoffs=(256,512)):
    filt = np.zeros(shp,dtype=float)
    XX=np.tile(np.arange(cutoffs[0]),(cutoffs[1],1)).T
    YY=np.tile(np.arange(cutoffs[1]),(cutoffs[0],1))
    filt[:cutoffs[0],:cutoffs[1]] = 0.25*(2. + np.cos(np.pi*XX/float(cutoffs[0])) + np.cos(np.pi*YY/float(cutoffs[1])))
    return filt

def dct_buildfilt(shape,cut=(0,256)):
    cutoff = cut[1]
    filt = np.zeros(shape[0],dtype=float)
    FREQ = np.arange(int(cutoff),dtype=float)
    if cut[0] > 0:
        cuton = cut[0]
        filt[int(cuton):int(cutoff)] = 0.5*(1.+np.sin(np.pi*np.arange(int(cutoff-cuton))/float(cutoff-cuton)))
    else:
        filt[:int(cutoff)] = 0.5*(1.+np.cos(np.pi*FREQ/float(cutoff)))
    return np.tile(filt,(shape[1],1)).T

def buildfilt(nsamples,nrolls,cutoff=0.01):
    FREQ = np.fft.fftfreq(nsamples)
    filt = np.zeros(FREQ.shape[0],dtype=float)
    inds = np.where(np.abs(FREQ)<cutoff)
    filt[inds] = 0.5*(1.+np.cos(np.pi*FREQ[inds]/cutoff))
    return np.tile(filt,(nrolls,1)).T

def getextrema(t1,t2):
    tmin = np.max([np.min(t1),np.min(t2)])
    tmax = np.min([np.max(t1),np.max(t2)])
    return tmin,tmax

def bipolarlognorm(inmat):
    posinds = np.argwhere(inmat>0)
    neginds = np.argwhere(inmat<0)
    ypos = np.log(np.abs(inmat[posinds]))
    ypos -= np.min(ypos)
    ypos = (ypos.astype(float)*254/np.max(ypos) + 1).astype(int)
    yneg = np.log(np.abs(-1*inmat[neginds]))
    yneg -= np.min(ypos)
    yneg = (yneg.astype(float)*254/np.max(yneg) + 1).astype(int)
    out = np.zeros(inmat.shape,dtype=int)
    out[posinds] = ypos
    out[neginds] = -1*yneg
    return out

def findroot(th,g):
    # using 2 step Newton-Raphson to find the root that tells me the limit above which the max p = log(histogram value)
    powrange = np.arange(4)
    for i in range (4):
        xpows = np.power(np.full(powrange.shape,g),powrange)
        g -= xpows.dot(th)/(powrange[1:]*xpows[:-1]).dot(th[1:])
    return g




def process(path,shot):

    ecefile = '%s/%i%s'%(path,shot,'ECE')
    besfile = '%s/%i%s'%(path,shot,'BES')
    if not os.path.isdir('%s/h5files'%path):
        mode = 0o774
        os.mkdir('%s/h5files'%path,mode)
    outfile = '%s/h5files/collection_dct.h5'%(path)

    with h5py.File(outfile,'w') as f:
        grp_shot = f.create_group('shot%i'%shot)
        data_ece = np.load(ecefile,allow_pickle=True)
        data_bes = np.load(besfile,allow_pickle=True)
        keys_ece = list(data_ece.keys())
        keys_bes = list(data_bes.keys())
        t_ece = ((data_ece[keys_ece[0]]['data.time']+0.00025)*1e3).astype(int)
        t_bes = ((data_bes[keys_bes[0]]['data.time']+0.00025)*1e3).astype(int)
        tmin,tmax = getextrema(t_bes,t_ece)
        print(tmin,tmax)
        inds_ece_coince = np.where((t_ece>tmin) * (t_ece<tmax))
        inds_bes_coince = np.where((t_bes>tmin) * (t_bes<tmax))
        sz_ece = t_ece[inds_ece_coince].shape[0]
        sz_bes = t_bes[inds_bes_coince].shape[0]
        print('sz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i'%(sz_ece,sz_bes,(sz_bes-2*sz_ece)))


        ######################################
        ####### ECE section ##################
        ######################################


        nsamples = 1024
        nfolds = int(sz_ece//nsamples)
        print('ECE nfolds*nsamples = ',nfolds*nsamples)
        t = t_ece[inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        grp_ece = grp_shot.create_group('ece')
        grp_ece.create_dataset('times',data=t,dtype=np.int64)
        ece_logabs = grp_ece.create_group('logabs')
        ece_logabsfilt = grp_ece.create_group('logabsfilt')


        mask,MASK = getmask((nsamples,nfolds))
        #mask,MASK = getmask_deep((nsamples,nfolds))
        filt = buildfilt(nsamples,nfolds,cutoff=.10)# by inspection this looks good for BG subtraction on ECE images
        dct_filt2d = dct_buildfilt2d((nsamples,nfolds*2),cutoffs=(nsamples//16,nfolds//4)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt = dct_buildfilt((nsamples,nfolds),cut=(0,64)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt_ecederiv = dct_deriv_buildfilt((nsamples,nfolds),cut=(8,3*nsamples//4)) 
        dct_filt_ece = dct_buildfilt((nsamples,nfolds),cut=(8,nsamples//4)) 

        for k in keys_ece:
            m = re.search('^ece.{2}(\d+)$',k)
            if m:
                ch = m.group(1)
                print('%s\t%s\t%ix%i'%(m.group(0),m.group(1),nsamples,nfolds))
                if data_ece[k]['data.ECE'].shape[0]>1:
                    x = data_ece[k]['data.ECE'][inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
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

                    DOUT = fft.idct(fft.dct(OUT,axis=0)*dct_filt_ecederiv,axis=0)
                    DOUT -= np.min(DOUT)
                    #DOUT *= (2**16-1)/np.max(DOUT)

                    #OUT *= (2**16-1)/np.max(OUT)
                    ece_logabs.create_dataset('%s'%ch,data=OUT[:nsamples,:nfolds], dtype=np.float32)
                    ece_logabsfilt.create_dataset('%s'%ch,data=DOUT[:nsamples,:nfolds], dtype=np.float32)


        ######################################
        ####### BES section ##################
        ######################################

        nsamples *= 2
        print('BES nfolds*nsamples = ',nfolds*nsamples) ## time steps in 'folds' are (1 musec * nsamples = e.g. 2048*1mu = 2.048ms)
        t = t_bes[inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T

        dct_filt_ELMrecover = dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples//4)) 
        dct_filt_ELMpop = dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 
        dct_filt_besderiv = dct_deriv_buildfilt((nsamples,nfolds),cut=(0,3*nsamples//4)) 
        dct_filt_besdderiv = dct_deriv_buildfilt((nsamples,nfolds),cut=(1,3*nsamples//4)) 

        grp_bes = grp_shot.create_group('bes')
        grp_bes.create_dataset('times',data=t,dtype=int)
        bes_logabs = grp_bes.create_group('logabs')
        bes_logabsfilt = grp_bes.create_group('logabsfilt')
        bes_dctlaf = grp_bes.create_group('dct_laf')
        bes_elmpop = grp_bes.create_group('elmpop')
        bes_elmrec = grp_bes.create_group('elmrec')

        for k in keys_bes:
            m = re.search('^bes.{2}(\d+)',k)
            if m:
                ch = m.group(1)
                print('%s\t%s\t%ix%i'%(m.group(0),m.group(1),nsamples,nfolds))
                if (data_bes[k]['data.BES'].shape[0]>1):
                    x = data_bes[k]['data.BES'][inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    xx = np.row_stack((x,np.flip(x,axis=0)))
                    #X = np.fft.fft(x,axis=0)
                    X = fft.dct(xx,axis=0)
                    elmrec = -fft.idst(X*dct_filt_ELMrecover,axis=0)
                    elmpop = -fft.idst(X*dct_filt_ELMpop,axis=0) 
                    elmrec -= np.mean(elmrec)
                    #elmrec *= (2**15-1)/np.max(np.abs(elmrec))

                    elmpop -= np.mean(elmpop)
                    #elmpop *= (2**15-1)/np.max(np.abs(elmpop))

                    AX = np.abs(X)[::2,:] ## AX is symmetric along axis=0 since it is the abs of dct coefficients i.e. root(power spectrum).
                    #PX = np.angle(X)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1) ## again, this is symmetric along axis=0 since it is the log(root power spectrum + 1)

                    qout = fft.dct(OUT,axis=0)  ## OUT is still symmetric about axis=0, BUT dct_filt_besderiv probably should be not... explore here, there maybe a bug
                                                ## qout (q for q-frency of the cepstrum)
                    DOUT = fft.idct(qout*dct_filt_besderiv,axis=0)
                    DOUT -= np.mean(DOUT)
                    #DOUT *= (2**16-1)/np.max(DOUT)*(DOUT>0)

                    ### BG subtraction doesn't work for BES since ELM pops would then be excluded
                    #BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt_bes ,axis=0)
                    #OUT -= BG
                    #OUT *= (2**16-1)/np.max(OUT[3:-2,:])
                    bes_logabs.create_dataset('%s'%ch,data=OUT[:nsamples,:],dtype=np.float32)
                    bes_logabsfilt.create_dataset('%s'%ch,data=DOUT[:nsamples,:],dtype=np.float32) # laf == logabsfilt
                    bes_dctlaf.create_dataset('%s'%ch,data=qout[:nsamples:2,:],dtype=np.float32) ## this is the spectrogram of the log abs filtered... dct version...
                    bes_elmpop.create_dataset('%s'%ch,data=elmpop[:nsamples,:],dtype=np.float32) ## This is where I save the ELM pop events
                    bes_elmrec.create_dataset('%s'%ch,data=elmrec[:nsamples,:],dtype=np.float32) ## and the recovery from the pop

        #closing with h5py.File() as f
    
    return

def main():
    #path = '/projects/EKOLEMEN/ecebes'
    path = '~/coffee_group/EKOLEMEN/ecebes'
    shot = 122117

    if len(sys.argv)>2:
        path = sys.argv[1]
        shotstrings = sys.argv[2:]
        for shotstring in shotstrings:
            shot = int(shotstring)
            if os.path.exists('%s/%iBES'%(path,shot)) and os.path.exists('%s/%iECE'%(path,shot)):
                print('processing shot %i'%shot)
                process(path,shot)
    else:
        print('syntax: %s <path> <shotnumbers>'%sys.argv[0])
        return

    return

if __name__ == '__main__':
    main()
