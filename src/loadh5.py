#!/usr/bin/python3
import numpy as np
import json
import h5py
import os
import sys
import re

from BESmappings import BESmap

def blurTH(M,th=0.,center=0.,bwd0=.1,bwd1=1):
    x=np.linspace(-1*M.shape[1]/M.shape[0],1*M.shape[1]/M.shape[0],M.shape[1])
    y=np.linspace(-1,1,M.shape[0])
    XX,YY = np.meshgrid(x,y)
    XXP = XX * np.cos(th) - YY * np.sin(th)
    YYP = XX * np.sin(th) + YY * np.cos(th)
    ZZP = np.cos(XXP/bwd0*np.pi/2) * (np.abs(XXP)/bwd0<1.) * np.cos(YYP/bwd1*np.pi/2.) * (np.abs(YYP)/bwd1<1)
    ZZP = np.roll(ZZP,ZZP.shape[0]//2,axis=0)
    ZZP = np.roll(ZZP,ZZP.shape[1]//2,axis=1)
    print(np.max(ZZP),np.min(ZZP))
    return ZZP

def derivTH(M,th=0.,center=0.,bwd0=.1,bwd1=1):
    x=np.linspace(-1*M.shape[1]/M.shape[0],1*M.shape[1]/M.shape[0],M.shape[1])
    y=np.linspace(-1,1,M.shape[0])
    XX,YY = np.meshgrid(x,y)
    XXP = XX * np.cos(th) - YY * np.sin(th)
    YYP = XX * np.sin(th) + YY * np.cos(th)
    ZZP = np.power(np.cos(XXP/bwd0*np.pi/2),int(2)) * (np.abs(XXP)/bwd0<1.) * np.sin(YYP/bwd1*np.pi)*np.cos(YYP/bwd1*np.pi/2.) * (np.abs(YYP)/bwd1<1)
    ZZP = np.roll(ZZP,ZZP.shape[0]//2,axis=0)
    ZZP = np.roll(ZZP,ZZP.shape[1]//2,axis=1)
    print(np.max(ZZP),np.min(ZZP))
    return ZZP

def dderivTH(M,th=0.,center=0.,bwd0=.1,bwd1=1):
    x=np.linspace(-1*M.shape[1]/M.shape[0],1*M.shape[1]/M.shape[0],M.shape[1])
    y=np.linspace(-1,1,M.shape[0])
    XX,YY = np.meshgrid(x,y)
    XXP = XX * np.cos(th) - YY * np.sin(th)
    YYP = XX * np.sin(th) + YY * np.cos(th)
    ZZP = np.cos(XXP/bwd0*np.pi/2) * (np.abs(XXP)/bwd0<1.) * np.cos(YYP/bwd1*3.*np.pi/2.)*np.cos(YYP/bwd1*np.pi/2.) * (np.abs(YYP)/bwd1<1)
    ZZP = np.roll(ZZP,ZZP.shape[0]//2,axis=0)
    ZZP = np.roll(ZZP,ZZP.shape[1]//2,axis=1)
    print(np.max(ZZP),np.min(ZZP))
    return ZZP

def loadjson(fname):
    f = open(fname,'r')
    data = json.load(f) 
    f.close()
    return data

def separatedets(data):
    detname = []
    dettstep = []
    dettstart = []
    detdata = []
    for det in data.keys():
        print('%s:\t%s'%(det,data[det].keys()))
        for key in data[det].keys():
            print(data[det]['time']['dtype'])
        detname += [det]
        dettstep += [data[det]['time']['__ndarray_tolist__'][1] - data[det]['time']['__ndarray_tolist__'][0]]
        dettstart += [data[det]['time']['__ndarray_tolist__'][0]]
        detdata += [np.array(data[det]['data']['__ndarray_tolist__'])]
    return detname,dettstep,dettstart,detdata

def main():
    if len(sys.argv)<2:
        print('syntax: loadh5.py <datafilename>')
        test = BESmap()
        test.setinds(4,4,63)
        test.setinds(5,7,31)
        print(test.getinds())
        print(test.getmap())

        return
    m = re.search('(.*)/(.*)\.hdf5',sys.argv[1])
    if not m:
        print('no fname match')
        print('syntax: ./src/loadh5.py <datafilename>')
        return
    fname = m.group(0)
    fpath = m.group(1)
    fnamehead = m.group(2)

    sz_tae = int(2**10) # TAE is Torroidal Alfvenic Mode in the 50..200kHz regime
    sz = sz_tae
    f = h5py.File(fname,'r')
    print('NOTE: Dave said sampling is 1MSPs')
    F = np.abs(np.fft.fftfreq(sz_tae,0.001))
    Fmin = F[1]
    LF = np.where(F>Fmin,np.log(F),np.log(Fmin))
    FMAT = np.array([],dtype=float)
    LFMAT = np.array([],dtype=float)
    for shot in list(f.keys()):
        for det in list(f[shot].keys()):
            print('shot %s: det %s: shape = %s'%(shot,det,f[shot][det].shape[0]))
            nrolls = int(f[shot][det].shape[1]//sz - 1)
            nchans = f[shot][det].shape[0]
            y = np.zeros((sz,nrolls,nchans),dtype=float)
            out = np.zeros((nchans,nchans),dtype=float)
            for chan in range(nchans):
                print(y.shape)
                y[:,:,chan] = f[shot][det][chan][:sz*nrolls].reshape((sz,nrolls))
                '''
                S = np.abs(np.fft.fft(y[:,:,chan],axis=0))
                LS = np.column_stack((np.log(S),np.fliplr(np.log(S))))
                if len(LFMAT)<2*S.shape[1]:
                    LFMAT = np.tile(LF,(2*y.shape[1],1)).T
                print('%s/processed/%s.shot_%s.chan_%s.power'%(fpath,fnamehead,shot,chan))
                np.savetxt('%s/processed/%s.shot_%s.chan_%s.power'%(fpath,fnamehead,shot,chan),np.exp(LS + LFMAT)[:sz//2,:S.shape[1]],fmt='%.3e')
                '''
            images = []
            print('computing covariances')
            for roll in range(nrolls):
                images += [np.cov(y[:,roll,:].T)]
                diag = np.diag(images[-1])
                if (images[-1].shape[0] == nchans):
                    for i in range(nchans):
                        for j in range(nchans):
                            images[-1][i,j] /= np.sqrt(diag[i]*diag[j])
                #np.savetxt('%s/processed/%s.shot_%s.roll_%s.cov'%(fpath,fnamehead,shot,roll),out,fmt='%.3e')
                #print('saved roll %i with shape %s'%(roll,out.shape))
                '''
                for i in range(16):
                    np.savetxt('%s/processed/%s.shot_%s.roll_%s.covimg%i'%(fpath,fnamehead,shot,roll,i),out[:,i].reshape(-2,8),fmt='%.3e')
                '''
            print('saving video out')
            shape = (images[0].shape[1], images[0].shape[0])
            fourcc = cv.VideoWriter_fourcc(*"mp4v")  # XVID for avi, mp4v for mp4
            out = cv.VideoWriter('%s/processed/vidout_%s_%s.mp4'%(fpath,det,shot), fourcc, 20.0, shape, 0)
            print('finished shot%s'%shot)

    return


if __name__ == '__main__':
    main()
