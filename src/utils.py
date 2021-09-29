#!/usr/bin/python3

import numpy as np
from scipy.fftpack import dct,idct,idst

class my_dct_f16:
    def __init__(sz):
        return self
    def fill_dct_matrix(self):
        u = np.ones((sz),dype=np.float16)*np.float16(np.sqrt(2./sz))
        u[0] /= np.sqrt(2.)
        i=2*np.arange(5).reshape(-1,1)+1
        m = np.arange(5).reshape(1,-1)
        argmat = i.dot(m).T.dot((x*u).reshape(-1,1))
        argmat = np.arange(sz,shape=(1,sz))
        cmat = np.cos(np.pi/(2*sz) * argmat)
        return self
    def fill_idct_matrix(self):
        return self
    def fill_idst_matrix(self):
        return self

def precalc_dctLogic(dctmat,s,nrolloff=128):

    return idct(WAVE)[:inflate*sz]*idst(DWAVE)[:inflate*sz]/(4*sz**2) # constructing the sig*deriv waveform 

def dctLogic(s,inflate=1,nrolloff=128):
    rolloff_vec = 0.5*(1.+np.cos(np.arange(nrolloff,dtype=float)*np.pi/float(nrolloff)))
    sz_roll = rolloff_vec.shape[0]
    sz = s.shape[0]
    wave = np.append(s,np.flip(s,axis=0))
    WAVE = dct(wave)
    #WAVE = rollon(WAVE,4)
    WAVE[-sz_roll:] *= rolloff_vec
    if inflate>1: # inflating seems to increase the aliasing... so keeping to inflate=1 for the time being.
        WAVE = np.append(WAVE,np.zeros((inflate-1)*WAVE.shape[0])) # adding zeros to the end of the transfored vector
    DWAVE = np.copy(WAVE) # preparing to also make a derivative
    DWAVE[:s.shape[0]] *= np.arange(s.shape[0],dtype=float)/s.shape[0] # producing the transform of the derivative
    return idct(WAVE)[:inflate*sz]*idst(DWAVE)[:inflate*sz]/(4*sz**2) # constructing the sig*deriv waveform 

def scanedges(d,minthresh,expand=1):
    tofs = []
    slopes = []
    sz = d.shape[0]
    i = 10
    while i < sz-10:
        while d[i] > minthresh:
           i += 1
        if i==sz-10: return tofs,slopes,len(tofs)
            while i<sz-10 and d[i]<0:
                i += 1
        start = i-1
        stop = i
        x0 = start - float(stop-start)/float(d[stop]-d[start])*d[start]
        i += 1
        tofs += [expand*float(x0)]
        slopes += [float(d[stop]-d[start])/float(stop-start)] ## scaling to reign in the obscene derivatives... probably shoul;d be scaling d here instead
    return tofs,slopes,len(tofs)

