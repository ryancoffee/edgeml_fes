#!/usr/bin/python3

import numpy as np
from scipy.fftpack import dct

def gauss(x,c,w):
    return np.exp(-((x-c)/w)**2)

def genSig(x,seed=1):
    rng = np.random.default_rng(seed)
    ncenters = rng.poisson(5)
    centers = rng.uniform(0,x.shape[0],ncenters)
    y = np.zeros(x.shape,dtype=float)
    for c in centers:
        y += gauss(x,c,2.)
    return y

size = 2**6
matDCT = dct(np.identity(size),type=2)
matIDCT = dct(np.identity(size),type=3)/2/size

matDCT = dct(np.identity(size),type=2)
matIDCT = dct(np.identity(size),type=3)/2/size
lbits=4
matDCT_lb = (2**(lbits-1)*dct(np.identity(size),type=2)).astype(int)
matIDCT_lb = (2**(lbits-1)*dct(np.identity(size),type=3)).astype(int)

symIdent = np.concatenate((np.identity(size),np.flip(np.identity(size),axis=1)),axis=1)
evenIdent = np.zeros(symIdent.shape)
evenIdent[:,::2] = np.identity(size)
symMatDCT = dct(symIdent,axis=1,type=2)
symMatIDCT = dct(evenIdent,type=3,axis=1)/2/size


def main():
    x = np.arange(size,dtype=float)
    y = genSig(x,seed=10)
    np.savetxt('testDCT.dat',np.stack((x,y),axis=1),fmt='%.3f')
    ysym = np.concatenate((y,np.flip(y,axis=0)))
    Ydct = dct(y,type=2)
    yidct = dct(Ydct,type=3)/2/y.shape[0]
    YmatDCT = np.dot(matDCT,y)
    ymatIDCT = np.dot(matIDCT,YmatDCT)
    YmatDCT_lb = np.dot(matDCT_lb,y)
    ymatIDCT_lb = np.dot(matIDCT_lb,YmatDCT_lb)
    #yidct = (dct(Ydct,type=3)/2/y.shape[0]/2)[:y.shape[0]]
    YmatDCT = np.dot(symMatDCT,ysym)
    print(YmatDCT.shape)
    print(symMatIDCT.shape)

        
    np.savetxt('testDCT.dat',np.stack((x,y,yidct,ymatIDCT,ymatIDCT_lb/size/(2**(2*lbits-1))),axis=1),fmt='%.3f')
    np.savetxt('symIdent.dat',symIdent,fmt='%i')
    np.savetxt('DCTmat.dat',matDCT,fmt='%.2f')
    np.savetxt('DCTsymIdent.dat',symMatDCT,fmt='%.2f')
    np.savetxt('IDCTevenIdent.dat',symMatIDCT,fmt='%.2f')

    #Y = np.dot(symMatDCT[:y.shape[0],:],y)
    #print(Y)
    #y_matidct = np.dot(symMatIDCT,Y)
    #print(y_matidct)
    return

if __name__ == '__main__':
    main()
