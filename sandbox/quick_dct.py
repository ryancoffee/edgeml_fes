#!/usr/bin/python3
import numpy as np
from scipy.fftpack import dct,idct,idst

def gauss(x,x0,w):
    return np.exp(-np.power((x-float(x0))/w,int(2)))

## there should be a way to use the symmetry to ignore odd coefficients and quietly pretend we've mirrored the input vector

def filldct(N):
    mvec = np.arange(N,dtype=float)
    kvec = np.arange(N,dtype=float)
    MMAT,KMAT = np.meshgrid(mvec,kvec)
    res = np.cos(np.pi*(2.*MMAT+1)*KMAT/2/N)
    for i in range(len(res)):
        res[i] *= 2./N
    res[0] /= np.sqrt(2.)
    return res

def main():
    N = 16
    x = np.arange(N,dtype=float)
    y = gauss(x,5,2) + gauss(x,12,2) + gauss(x,10,1.5) + gauss(x,2,1)
    yback = (1./(4*N))*idct( dct(np.append(y,np.flip(y,axis=0))))[:N]
    dyback = (1./(4*N))*idst( np.arange(2*N,dtype=float)*dct(np.append(y,np.flip(y,axis=0))) )[:N]
    ## _ = [print('.'*int(10.*v)) for v in y]
    np.savetxt('tempquick.out',np.column_stack((x,y,yback,dyback)),fmt='%.4f')
    np.savetxt('dct.out',filldct(N),fmt='%.4f')



    return

if __name__ == '__main__':
    main()
