#!/usr/bin/python3
import numpy as np
import json
import h5py
import os
import sys
import re

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
        #files are in ./data/122117.json
        print('syntax: loadjason.py <datafilename>')
        return
    m = re.search('(.*)/(.*)\.json',sys.argv[1])
    if not m:
        print('no fname match')
        print('syntax: loadjason.py <datafilename>')
        return
    fname = m.group(0)
    fpath = m.group(1)
    fnamehead = m.group(2)


    data = loadjson(fname)
    namelist,tsteplist,tstartlist,vallist = separatedets(data)
    _ = [print(v[:10]) for v in vallist]
    for i in range(len(namelist)):
        header = 'det = %s\ttstart = \t %.3f\ttstep = %.3f'%(namelist[i],tstartlist[i],tsteplist[i])
        np.savetxt('%s/processed/%s.%s.dat'%(fpath,fnamehead,namelist[i]),vallist[i],fmt='%.3e')

    out = np.c_[vallist[0],vallist[1],vallist[2][::2]]
    np.savetxt('%s/processed/%s.detspasted.dat'%(fpath,fnamehead),out,fmt='%.3e')

    #sz = int(2**13)
    #rollsz = int(2**8)
    collect = []
    for ind in range(len(namelist)):
        sz_tae = int(2**9) # TAE is Torroidal Alfvenic Mode in the 50..200kHz regime
        sz_ktf = int(2**11) # KTF is Kink, Tear, Fishbone band in the 1..30kHz regime
        
        sz = sz_tae
        rollsz = sz
        nrolls = len(vallist[ind])//rollsz
        y = np.zeros((sz,nrolls),dtype=float)
        print(y.shape)
        for i in range(nrolls):
            y[:,i] = np.roll(vallist[ind],-rollsz*i)[:sz].copy()

        Y = np.fft.fft(y,axis=0)
        F = np.fft.fftfreq(sz,tsteplist[ind])
        FMAT = np.tile(F,(2*Y.shape[1],1)).T

        OUT = np.abs(Y)

        LY = np.column_stack((np.log(OUT),np.fliplr(np.log(OUT))))
        dmatch = re.search('ECE',namelist[ind])
        if dmatch:
            tmp = np.log(np.abs(FMAT))
            LY += np.where(tmp>-10,tmp,-10)
        else:
            tmp = np.log(np.abs(np.tanh(FMAT/8)))
            LY += np.where(tmp>-10,tmp,-10)
        np.savetxt('%s/processed/%s.%s.TAEraw'%(fpath,fnamehead,namelist[ind]),np.c_[F,np.exp(LY)],fmt='%.3e')

        print('========== Now, working on the Schlieren idea ===========')

        qLY = np.fft.fft2(LY)
        nthetas = 16 
        thetas = [i*np.pi/nthetas for i in range(nthetas)]
        qfilt = [blurTH(LY,th=th,center=0.,bwd0=.25,bwd1=2) for th in thetas]
        NEWOUT = [np.fft.ifft2(qLY*qfilt[i]).real for i in range(nthetas)]
        print(NEWOUT[0].shape)
        for i in range(1,nthetas):
            NEWOUT[0] = np.where(NEWOUT[i]>NEWOUT[0],NEWOUT[i],NEWOUT[0])
        np.savetxt('%s/processed/%s.%s.TAEfilt'%(fpath,fnamehead,namelist[ind]),np.c_[F[:sz//2],np.exp(NEWOUT[0][:sz//2,:NEWOUT[0].shape[1]//2])],fmt='%.3e')

        sz = sz_ktf
        rollsz = sz
        nrolls = len(vallist[ind])//rollsz
        y = np.zeros((sz,nrolls),dtype=float)
        print(y.shape)
        for i in range(nrolls):
            y[:,i] = np.roll(vallist[ind],-rollsz*i)[:sz].copy()

        Y = np.fft.fft(y,axis=0)
        F = np.fft.fftfreq(sz,tsteplist[ind])
        FMAT = np.tile(F,(4*Y.shape[1],1)).T

        OUT = np.abs(Y)
        LY = np.column_stack((np.log(OUT),np.fliplr(np.log(OUT))))
        LY = np.column_stack((LY,np.fliplr(LY)))
        dmatch = re.search('ECE',namelist[ind])
        if dmatch:
            tmp = np.log(np.abs(np.tanh(FMAT/4)))
            LY += np.where(tmp>-10,tmp,-10)
        else:
            tmp = np.log(np.abs(np.tanh(FMAT/8)))
            LY += np.where(tmp>-10,tmp,-10)
        np.savetxt('%s/processed/%s.%s.KTFraw'%(fpath,fnamehead,namelist[ind]),np.c_[F,np.exp(LY)],fmt='%.3e')


        qLY = np.fft.fft2(LY)
        nthetas = 32 
        thetas = [i*np.pi/nthetas for i in range(nthetas)]
        qfilt = [blurTH(LY,th=th,center=0.,bwd0=.0625,bwd1=2) for th in thetas]
        NEWOUT = [np.fft.ifft2(qLY*qfilt[i]).real for i in range(nthetas)]
        print(NEWOUT[0].shape)
        for i in range(1,nthetas):
            NEWOUT[0] = np.where(NEWOUT[i]>NEWOUT[0],NEWOUT[i],NEWOUT[0])
        np.savetxt('%s/processed/%s.%s.KTFfilt'%(fpath,fnamehead,namelist[ind]),np.c_[F[:sz//2],np.exp(NEWOUT[0][:sz//2,:NEWOUT[0].shape[1]//4])],fmt='%.3e')
        '''
        if ind==0:
            collect = LY[::2,:]
        #if ind==1:
        #    collect += LY[::2,:]
        if ind==2:
            sz = LY.shape[0]
            collect = collect + LY[:-sz//2,:-2:2]
        '''

        

        print('======= entering inner product method ============')
        print('========== Gave up on convolution=================')
        '''
        win = 2 # ms for a lowest frequency of 1/20 ms = 50kHz... actually, this needs to be as large as the smallest frequency step, e.g. 1ms
        t = np.linspace(-win//2,win//2,int(win/tsteplist[ind])+1)
        env = np.cos(t/t[-1]*np.pi/2)
        y = vallist[ind].copy()[:int(len(vallist[ind])//t.shape[0])*t.shape[0]]
        y = y.reshape(t.shape[0],-1)
        kern_c = np.c_[[env*np.cos(t/t[-1]*np.pi*(i+1)/2) for i in range(50,100)]]
        kern_s = np.c_[[env*np.sin(t/t[-1]*np.pi*(i+1)/2) for i in range(50,100)]]
        print('Giving up... using Fourier convolution')
        KERN_C = np.fft.fft(kern_c,axis=0)
        KERN_S = np.fft.fft(kern_s,axis=0)
        Y = np.fft.fft(y,axis=0)
        out = []
        for i in range(Y.shape[1]):
            out += [np.max(np.fft.ifft(Y[:,i]*KERN_C,axis=1).real,axis=1) + np.max(np.fft.ifft(Y[:,i]*KERN_S,axis=1).real,axis=1)]
        print(np.c_[out].shape)
        np.savetxt('%s/processed/%s.%s.conv'%(fpath,fnamehead,namelist[ind]),np.fft.ifft(KERN_S,axis=0).real,fmt='%.3e')
        '''

        '''
        res = []
        step=int(1)
        for i in range(len(Y)//step):
            Y = np.roll(Y,-step)
            res += [(np.power(kern_c.dot(Y[:kern_c.shape[1]].reshape(-1,1)),int(2)) + np.power(kern_s.dot(Y[:kern_s.shape[1]].reshape(-1,1)),int(2))).reshape(-1)]
        res = np.c_[res]
        for i in range(res.shape[0]//kern_s.shape[1]):
            res[i,:] = np.max(res[i:i+kern_s.shape[1],:],axis=0)
        '''


        #Now, take the inner product of each row of y_c and y_s with the data that is rolling through and that should give the cosine and sine transforms for frequency range of interes.

        '''
        LYfilt = np.fft.ifft(np.fft.fft(LY,axis=0)*QFILT,axis=0).real
        np.savetxt('%s/processed/%s.ece64.pspecScaledFilt'%(fpath,fnamehead),np.exp(LYfilt),fmt='%.3e')
        '''

    np.savetxt('%s/processed/%s.%s.%s.mult'%(fpath,fnamehead,namelist[0],namelist[2]),np.exp(collect),fmt='%.3e')


    return

if __name__ == '__main__':
    main()
