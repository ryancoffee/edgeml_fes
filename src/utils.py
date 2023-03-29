#!/usr/bin/python3

import numpy as np
from scipy.fft import dct,idct,dst,idst
import time

rng = np.random.default_rng(time.time_ns()%(1<<8))

def saturate_uint(x,bits):
    inds = np.where(x>((1<<bits)-1))
    x[inds] = ((1<<bits)-1)
    inds = np.where(np.sign(x) == -1)
    x[inds] = 0
    return x

def saturate_int(x,bits):
    inds = np.where(np.abs(x)>((1<<bits)-1))
    x[inds] = ((1<<bits)-1)*np.sign(x[inds])
    return x

def testBit(int_type, offset):
    mask = 1 << offset
    return(int_type & mask)

def setBit(int_type, offset):
    mask = 1 << offset
    return(int_type | mask)

def clearBit(int_type, offset):
    mask = ~(1 << offset)
    return(int_type & mask)

def toggleBit(int_type, offset):
    mask = 1 << offset
    return(int_type ^ mask)

def getSetBits(int_type):
    s = []
    i = 0
    while int_type>0:
        if (int_type & 1):
            s += [i]
        int_type >>= 1
        i += 1
    return s

def mod2exp(int_type, offset):
    return (int_type & ( (1<<int(offset)) - 1) )
    #n % 2^i = n & (2^i - 1)
'''
        for (i=1, iter=1; i<256; i<<=1, iter++)
        if (myvalue & i)
            printf("Flag: %d set\n", iter);
            '''


def randomround(x:float,rng):
        return (np.int64(x) + np.int64(x%1>rng.random()))

def mypoly(x,order=4):
    result = np.ones((x.shape[0],order+1),dtype=float)
    result[:,1] = x.copy()
    if order < 2:
        return result
    for p in range(2,order+1):
        result[:,p] = np.power(result[:,1],int(p))
    return result

def fitpoly(x,y,order=4):
    assert len(x)==len(y)
    assert len(x)>order
    x0 = np.mean(np.array(x))
    theta = np.linalg.pinv( mypoly(np.array(x-x0).astype(float),order=order) ).dot(np.array(y).astype(float)) # fit a polynomial (order 3) to the points
    return x0,theta

def fitval(x,theta):
    y = float(0.)
    for p,th in enumerate(theta):
        y += float(th)*math.pow(x,int(p))
    return y

def fitcurve(x,theta):
    y = np.zeros(x.shape,dtype=float)
    for p in range(theta.shape[0]):
        y += theta[p]*np.power(x,int(p))
    return y

class matTrans:
    sz = 1024
    def __init__(self):
        return 
    def setsz(self,s):
        self.sz = s
        return self
    def fill_dct_matrix(self):
        I = np.eye(self.sz*2)
        self.dctMat = dct(I,type=2,axis=0)[::2,:self.sz]
        return self
    def fill_idct_matrix(self):
        I = np.eye(self.sz*2)
        self.idctMat = dct(I,type=3,axis=0)[:self.sz,::2]
        return self
    def fill_dst_matrix(self):
        I = np.eye(self.sz*2)
        self.dstMat = dst(I,type=2,axis=0)[1::2,:self.sz]
        return self
    def fill_idst_matrix(self):
        I = np.eye(self.sz*2)
        self.idstMat = dst(I,type=3,axis=0)[:self.sz,1::2]
        return self
    def dct(self,x):
        return np.dot(self.dctMat,x)
    def idct(self,x):
        return np.dot(self.idctMat,x)
    def dst(self,x):
        return np.dot(self.dstMat,x)
    def idst(self,x):
        return np.dot(self.idstMat,x)

    def fill_logic_matrix(self,nrollon=0,nrolloff=128):
        rollon = 0.5*(1.-np.cos(np.arange(nrollon,dtype=float)*np.pi/float(nrollon)))
        rolloff = 0.5*(1.+np.cos(np.arange(nrolloff,dtype=float)*np.pi/float(nrolloff)))
        return self



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

def randomround(x:float,rng):
    return (np.int64(x) + np.int64(x%1>rng.random()))

def scanedges(data,thresh=500,expand=1):
    edges = []
    slopes = []
    nedges = []
    sz = data.shape[0]
    for j in range(data.shape[1]):
        e = []
        s = []
        d = data[:,j]
        i = 4
        while i < sz-4:
            while i<sz-4 and d[i] < thresh:
                i += 1
            if i==sz-4: continue 
            while i<sz-4 and d[i]>0:
                i += 1
            start = i-1
            stop = i
            x0 = float(stop) - float(d[stop])/float(d[stop]-d[stop-1])
            i += 1
            v = expand*float(x0)
            e += [np.uint64(randomround(v,rng))] 
            s += [d[stop]-d[stop-1]] 
        nedges += [len(e)]
        if len(edges)==0:
            edges = e
            slopes = s
        else:
            edges += e
            slopes += s
    return edges,slopes,nedges

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

def getmask5(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(8)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(8)]
    mask[0][:5,1] = 1./5.
    mask[1][:5,:5] = np.eye(5)/5.
    mask[2][1,:5] = 1./5.
    mask[3][:5,:5] = np.fliplr(np.eye(5))/5.
    mask[4][2,2] = 1./5.
    mask[4][3:5,1] = 1./5.
    mask[4][:2,3] = 1./5.
    mask[5][:5,:5] = np.flip(mask[4][:5,:5],axis=0)
    mask[6][:5,:5] = mask[4][:5,:5].T
    mask[7][:5,:5] = np.flip(mask[6][:5,:5],axis=0)
    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-2,axis=0),-2,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def getmask3(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(4)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(4)]
    mask[0][:3,1] = 1.
    mask[1][:3,:3] = np.eye(3)
    mask[2][1,:3] = 1.
    mask[3][:3,:3] = np.fliplr(np.eye(3))
    for i in range(len(mask)):
        mask[i] -= 1./3
    #mask[4][:3:2,0] = 1./3.
    #mask[4][1,1] = 1./3.
    #mask[5][:3,:3] = np.flip(mask[4][:3,:3],axis=1)
    #mask[6][:3,:3] = mask[4][:3,:3].T
    #mask[7][:3,:3] = np.flip(mask[6][:3,:3],axis=0)
    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-1,axis=0),-1,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def getderivmask3(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(4)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(4)]
    mask[0][0,:3] = 1./3.
    mask[0][2,:3] = -1./3.
    a=np.triu(np.ones(3),k=0)-1
    mask[1][:3,:3]=np.copy((a-np.flip(np.flip(a,axis=0),axis=1))/6.)
    mask[2][:3,:3]=np.copy((np.flip(a,axis=1)-np.flip(a,axis=0))/6.)
    mask[3][:3,0] = 1./6.
    mask[3][:3,2] = -1./6.
    #mask[3][0,:3] = -1./3.
    #mask[3][2,:3] = 1./3.
    #mask[5][:3,:3]=np.copy((np.flip(np.flip(a,axis=0),axis=1)-a)/6.)
    #mask[6][:3,:3]=np.copy((np.flip(a,axis=0)-np.flip(a,axis=1))/6.)
    #mask[1][:3,0] = -1./6.
    #mask[1][:3,2] = 1./6.

    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-1,axis=0),-1,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def deriv_buildfilt(shape,cut=(0,256)):
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

def dderiv_buildfilt(shape,cut=(0,256)):
    cuton = cut[0]
    cutoff = cut[1]
    filt = np.zeros(shape[0],dtype=float)
    if cut[0] > 0:
        cuton = cut[0]
        FREQ = np.arange(int(cuton),int(cutoff))
        filt[int(cuton):int(cutoff)] = -1*FREQ*FREQ*0.5*(1.+np.sin(np.pi*np.arange(int(cutoff-cuton))/float(cutoff-cuton)))
    else:
        FREQ = np.arange(int(cutoff))
        filt[:int(cutoff)] = -1.*FREQ*FREQ*0.5*(1.+np.cos(np.pi*FREQ/float(cutoff)))
    return np.tile(filt,(shape[1],1)).T

def buildfilt(shape,cut=(0,256)):
    cuton = cut[0]
    cutoff = cut[1]
    filt = np.zeros(shape[0],dtype=float)
    FREQ = np.arange(int(cutoff),dtype=float)
    if cut[0] > 0:
        cuton = cut[0]
        filt[int(cuton):int(cutoff)] = 0.5*(1.+np.sin(np.pi*np.arange(int(cutoff-cuton))/float(cutoff-cuton)))
    else:
        filt[:int(cutoff)] = 0.5*(1.+np.cos(np.pi*FREQ/float(cutoff)))
    return np.tile(filt,(shape[1],1)).T

def buildfilt2d(shp,cutoffs=(256,512)):
    filt = np.zeros(shp,dtype=float)
    XX=np.tile(np.arange(cutoffs[0]),(cutoffs[1],1)).T
    YY=np.tile(np.arange(cutoffs[1]),(cutoffs[0],1))
    filt[:cutoffs[0],:cutoffs[1]] = 0.25*(2. + np.cos(np.pi*XX/float(cutoffs[0])) + np.cos(np.pi*YY/float(cutoffs[1])))
    return filt

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
