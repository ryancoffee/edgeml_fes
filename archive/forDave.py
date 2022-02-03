#!/usr/bin/python3
from scipy import fft
import numpy as np

dct_filt_ELMpop = dct_deriv_buildfilt((nsamples*2,nfolds),cut=(0,nsamples)) 
def bes4elm(xin,chunklen=8):
    X = xin.reshape(8,-1)
    C=fft.dct(X,axis=0)

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
