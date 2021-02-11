#!/usr/bin/python3

import numpy as np
import sys
import h5py
import json
from scipy.stats import kurtosis,skew
from scipy.spatial.distance import cdist
from scipy.optimize import linear_sum_assignment
import cv2

def gauss(x,w,x0):
    y = np.zeros(x.shape)
    y = np.exp(-((x-x0)/w)**2)*np.cos((x-x0)*2*np.pi/3)
    return y

def raisedcos(f,w,f0):
    y = np.zeros((f.shape[0],),dtype=float)
    inds = np.where(np.abs(f)<f0)
    y[inds] = 1
    inds = np.where((np.abs(f)-f0>0) * (np.abs(f)-f0<w))
    y[inds] = 0.5*(1+np.cos((np.abs(f[inds])-f0)*np.pi/w))
    return y

def kurtmap(mat,kernel):
    k = kernel.shape[0]//2
    l = kernel.shape[1]//2
    kmat = np.zeros((mat.shape[0]//k,mat.shape[1]//l),dtype=float)
    for i in range(0,mat.shape[0],k):
        for j in range(0,mat.shape[1],l):
            kmat[i//k,j//l] = kurtosis(mat[i-k:i+k+1,j-l:j+l+1].reshape(-1))
    return kmat

def blurTH(M,th=0.,bwd0=.1,bwd1=1):
    x=np.linspace(-1*M.shape[1]/M.shape[0],1*M.shape[1]/M.shape[0],M.shape[1])
    y=np.linspace(-1,1,M.shape[0])
    XX,YY = np.meshgrid(x,y)
    XXP = XX * np.cos(th) - YY * np.sin(th)
    YYP = XX * np.sin(th) + YY * np.cos(th)
    ZZP = np.cos(XXP/bwd0*np.pi/2) * (np.abs(XXP)/bwd0<1.) * np.cos(YYP/bwd1*np.pi/2.) * (np.abs(YYP)/bwd1<1)
    ZZP = np.roll(ZZP,ZZP.shape[0]//2,axis=0)
    ZZP = np.roll(ZZP,ZZP.shape[1]//2,axis=1)
    return ZZP


def w2dist(im1,im2):
    weights = cdist(im1, im2)
    assignment = linear_sum_assignment(weights)
    wasserstein2 = weights[assignment].sum()/len(weights)
    return wasserstein2


def main():

    if len(sys.argv)>1:
        fname = sys.argv[1]
        f = open(fname,'r')
        data = json.load(f)
        f.close()
        detstrings = list(data.keys())
        imglist = []
        for det in range(len(detstrings)):
            #####################
            ####### HERE ########
            #####################
            nrows = 256
            nsamples = 512*nrows
            if det == 2:
                nsamples = 512*nrows*2
            x = np.array(data[detstrings[det]]['data']['__ndarray_tolist__'][:nsamples])
            xiq=x.reshape(nrows,-1).T
            Xwq = np.fft.fft(xiq,axis=0)
            Pw = 1./Xwq.shape[1]*np.sum(np.power(np.abs(Xwq),int(2)),axis=1)
            X2w = 1./Xwq.shape[1]*(np.sum(np.power(Xwq,int(2)),axis=1))
            X4w = 1./Xwq.shape[1]*(np.sum(np.power(Xwq,int(4)),axis=1))
            Kw = X4w/(np.power(X2w,int(2)))
            qfreqs = np.fft.fftfreq(Xwq.shape[1])
            filt = np.tile(raisedcos(qfreqs,.2,1.2),(xiq.shape[0],1))
            #qfreqs = np.fft.fftfreq(Xwq.shape[0])
            #filt = np.tile(raisedcos(qfreqs,.1,0.),(xiq.shape[1],1))
            
            Pwq = np.fft.ifft(np.fft.fft(np.power(np.abs(Xwq),int(2)),axis=1) * filt,axis=1).real
            Pwq[0,:]=Pwq[-1,:]
            BG = np.tile(np.mean(Pwq,axis=1),(Pwq.shape[1],1))
            Pwq = Pwq / BG.T
            X2wq = np.fft.ifft(np.fft.fft(np.power(Xwq,int(2)),axis=1) * filt,axis=1)
            X4wq = np.fft.ifft(np.fft.fft(np.power(Xwq,int(4)),axis=1) * filt,axis=1)
            #X2wq = np.fft.ifft(np.fft.fft(np.power(Xwq,int(2)),axis=0) * filt.T,axis=0).real
            #X4wq = np.fft.ifft(np.fft.fft(np.power(Xwq,int(4)),axis=0) * filt.T,axis=0).real
            Kwq = X4wq.real/(np.power(X2wq.real,int(2)))
            LP = np.log(Pwq)
            np.savetxt('%s.Pmap'%(fname),LP)
            np.savetxt('%s.Kmap'%(fname),kurtmap( np.power(np.abs(Xwq),int(2)), np.ones((5,9)) ))
            #np.savetxt('%s.Kmap'%(fname),Kwq)
    
            nthetas = 32
            thetas = [i*np.pi/nthetas for i in range(nthetas)]
            #qfilt = [blurTH(LP,th=th,bwd0=.0625,bwd1=2) for th in thetas]
            qfilt = [blurTH(LP,th=th,bwd0=.125,bwd1=1.) for th in thetas]
            qLP = np.fft.fft2(LP)
            NEWOUT = [np.fft.ifft2(qLP*qfilt[i]).real for i in range(nthetas)]
            print(NEWOUT[0].shape)
            for i in range(1,nthetas):
                NEWOUT[0] = np.where(NEWOUT[i]>NEWOUT[0],NEWOUT[i],NEWOUT[0])
            if det==2:
                inds = [i for i in range(256)] 
                inds += [1024-256+j for j in range(256)]
                np.savetxt('%s.Pmap.%s'%(fname,detstrings[det]),NEWOUT[0][inds,:],fmt='%.3e')
                imglist += [NEWOUT[0][inds,:]]
            else:
                np.savetxt('%s.Pmap.%s'%(fname,detstrings[det]),NEWOUT[0],fmt='%.3e')
                imglist += [NEWOUT[0]]
        for i,im in enumerate(imglist):
            fstring = '%s.Pmap.%s.png'%(fname,detstrings[i])
            im -= np.mean(im[:,10:])
            im *= 256/np.max(im[:,10:])
            '''
            cv2.imshow('img',im)
            cv2.imwrite(fstring,im)
            cv2.waitKey(0)
            cv2.destroyAllWindows()
            '''
        print(w2dist(imglist[0],imglist[2]) )
        print(w2dist(imglist[1],imglist[2]) )

        for i in range(2):
            crossimg = imglist[i]*imglist[2]
            crossimg -= np.mean(crossimg[:,10:])
            crossimg *= 256/np.max(crossimg[:,10:])
            fstring = '%s.Pmap.cross.%s-%s.png'%(fname,detstrings[i],detstrings[2])
            cv2.imwrite(fstring,crossimg)

    return

if __name__ == '__main__':
    main()
