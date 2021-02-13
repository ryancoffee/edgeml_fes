#!/home/rc8936/.conda/envs/rnc_fes/bin/python

import numpy as np
import h5py
import sys
import re
import cv2 as cv
from scipy.fftpack import dct,idct

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


def main():
    #path = '/projects/EKOLEMEN/ecebes'
    path = '/projects/EKOLEMEN/ecebes'
    shot = 122117
    if len(sys.argv)>1:
        m = re.search('^(.+)(\d{6})$',sys.argv[1])
        if m:
            path = m.group(1)
            shot = int(m.group(2))
    else:
        print('syntax: %s <path/filehead'%sys.argv[0])
    ecefile = '%s/%i%s'%(path,shot,'ECE')
    besfile = '%s/%i%s'%(path,shot,'BES')
    outfile = './data/%s.h5'%(shot)

    with h5py.File(outfile,'w') as f:
        data_ece = np.load(ecefile,allow_pickle=True)
        data_bes = np.load(besfile,allow_pickle=True)
        chans_ece = list(data_ece.keys())
        chans_bes = list(data_bes.keys())
        t_ece = ((data_ece[chans_ece[0]]['data.time']+0.00025)*1e3).astype(int)
        t_bes = ((data_bes[chans_bes[0]]['data.time']+0.00025)*1e3).astype(int)
        #print('ece [%i]\t'%t_ece.shape[0],np.min(t_ece),np.max(t_ece))
        #print('bes [%i]\t'%t_bes.shape[0],np.min(t_bes),np.max(t_bes))
        tmin,tmax = getextrema(t_bes,t_ece)
        print(tmin,tmax)
        inds_ece_coince = np.where((t_ece>tmin) * (t_ece<tmax))
        inds_bes_coince = np.where((t_bes>tmin) * (t_bes<tmax))
        sz_ece = t_ece[inds_ece_coince].shape[0]
        sz_bes = t_bes[inds_bes_coince].shape[0]
        print('sz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i'%(sz_ece,sz_bes,(sz_bes-2*sz_ece)))
        nsamples = 1024
        nfolds = int(sz_ece//nsamples)
        print('nfolds*nsamples = ',nfolds*nsamples)
        t = t_ece[inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        f.create_dataset('times',data=t)
        grp_ece = f.create_group('ece')

        hbins = [i for i in range(512)]
        hfit = hbins[1:9]
        hfitmat = np.c_[ones(),q,q**2,q**3]
        for ch in chans_ece:
            m = re.search('^ece.{2}(\d+)$',ch)
            if m:
                print(m.group(1))
                if data_ece[ch]['data.ECE'].shape[0]>1:
                    x = data_ece[ch]['data.ECE'][inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    X = np.fft.fft(x,axis=0)
                    OUT = np.log(np.power(np.abs(X),int(2)))
                    BG = np.fft.ifft(np.fft.fft(OUT.copy(),axis=0) * buildfilt(nsamples,nfolds,cutoff=0.05) ,axis=0).real
                    OUT = OUT - BG
                    OUT -= np.mean(OUT)
                    OUT *= 32/np.std(OUT)
                    h = np.log(1+np.histogram(OUT,hbins)[0])
                    theta = np.pinv(hfitmat).dot(h)
                    
                    '''
                    HERE HERE HERE HERE
                    f(x) = [1,x,x**2,x**3].dot(theta)
                    OK, take the histogram of values (after this mean 0 std 8)... this seems to place modes in example shot at about 80-90 )
                    Take the log of the histogram of values, fit f(x) (zeros centered), to a cubic poly from -1..8 (using peudo inverse method)
                    2 step Newton-Raphson with +8 as initial guess to find root (this is all so far in log space)
                    Find the max of values above the root, call it p
                    scale envelope is defined like Weiner as 1/(1+ exp( f(x) )/exp(p) )
                    
                    '''
                    #cv.normalize(OUT-BG,OUT,0,255,cv.NORM_MINMAX)
                    grp_ece.create_dataset(m.group(1),data=OUT[:nsamples//2,:].astype(np.int8))
                    print(ch,x.shape)
        '''
        print(chans_bes)
        print(chans_bes[-2],(data_bes[chans_bes[-1]]))
        print(chans_bes[-1],(data_bes[chans_bes[-1]]))
        '''
        grp_bes = f.create_group('bes')
        for ch in chans_bes:
            #if ((type(data_bes[ch]['data.BES'])!=type(None))):# and 
            m = re.search('^bes.{2}(\d+)',ch)
            if m:
                print(m.group(1))
                if (data_bes[ch]['data.BES'].shape[0]>1):
                    x = data_bes[ch]['data.BES'][inds_bes_coince[0][:nsamples*nfolds*2:2]].reshape(nfolds,nsamples).T
                    X = np.fft.fft(x,axis=0)
                    OUT = np.log(np.power(np.abs(X),int(2)))
                    BG = np.fft.ifft(np.fft.fft(OUT.copy(),axis=0) * buildfilt(nsamples,nfolds,cutoff=0.05) ,axis=0).real
                    OUT = OUT - BG
                    OUT -= np.mean(OUT)
                    OUT *= 8/np.std(OUT)
                    #cv.normalize(OUT-BG,OUT,0,255,cv.NORM_MINMAX)
                    grp_bes.create_dataset(m.group(1),data=OUT[:nsamples//2,:].astype(np.int8))
                    print(ch,x.shape)

        #closing with h5py.File() as f
    
    return

if __name__ == '__main__':
    main()
