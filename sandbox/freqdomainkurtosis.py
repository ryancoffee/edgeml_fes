#!/usr/bin/python3

import numpy as np
import sys
import h5py

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

def main():

    if len(sys.argv)>1:
        fname = sys.argv[1]
        f = h5py.File(fname,'r')
        shotstrings = list(f.keys())
        x = f[shotstrings[2]]['besdata'][()][52,:1024**2]
        xiq=x.reshape(256,-1).T
        Xwq = np.fft.fft(xiq,axis=0)
        Pw = 1./Xwq.shape[1]*np.sum(np.power(np.abs(Xwq),int(2)),axis=1)
        X2w = 1./Xwq.shape[1]*(np.sum(np.power(Xwq,int(2)),axis=1))
        X4w = 1./Xwq.shape[1]*(np.sum(np.power(Xwq,int(4)),axis=1))
        Kw = X4w/(np.power(X2w,int(2)))
        qfreqs = np.fft.fftfreq(Xwq.shape[1])
        filt = np.tile(raisedcos(qfreqs,.2,0.2),(xiq.shape[0],1))
        
        X2wq = np.fft.ifft(np.fft.fft(np.power(Xwq,int(2)),axis=1) * filt,axis=1).real
        X4wq = np.fft.ifft(np.fft.fft(np.power(Xwq,int(4)),axis=1) * filt,axis=1).real
        Kwq = X4wq/(np.power(X2wq,int(2)))
        np.savetxt('%s.Pmap'%(fname),np.power(np.abs(Xwq),int(2)))
        np.savetxt('%s.Kmap'%(fname),np.abs(Kwq))
        f.close()
    

if __name__ == '__main__':
    main()
