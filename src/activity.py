#!/sdf/group/lcls/ds/ana/sw/conda2/inst/envs/ps-4.6.0/bin/python 

import numpy as np
import h5py
import matplotlib.pyplot as plt
import sys
import re

def process(fname,outmat):
    with h5py.File(fname) as f:
        ntimes = f['ece']['edges']['nedges']['00'].shape[0]
        chans = list(f['ece']['edges']['nedges'].keys())
        outmat = np.zeros((len(chans),ntimes),dtype=np.uint8)
        for i,c in enumerate(chans):
            outmat[i,:]=f['ece']['edges']['nedges'][c][()]
    return outmat

def main(fname):
    m = re.search('.*/(\d+)_fft.h5',fname)
    if m:
        shotnum = m.group(1)
    else:
        shotnum = 'bad shotname'
    outmat = np.zeros((1,),dtype=np.uint8)
    outmat = process(fname,outmat)
    plt.pcolor(outmat)
    plt.clim(0,1<<4)
    #fig,axs = plt.subplots(2)
    #axs[0].pcolor(outmat)
    #outfft = np.fft.fft2(outmat)
    #filt = np.cos(np.arange(outfft.shape[0])*np.pi*2/float(outfft.shape[0])) + 1
    #filt2d = np.tile(np.expand_dims(filt,axis=-1),outfft.shape[1])
    #filtx = np.cos(np.arange(outfft.shape[1])*np.pi*2./float(outfft.shape[1])) + 1
    #filt2d *= np.tile(np.expand_dims(filtx,axis=-1),outfft.shape[0]).T
    #res = np.fft.ifft2(outfft*filt2d).real
    #axs[1].pcolor(res)
    #axs[1].colorbar()
    plt.title(shotnum)
    plt.show()

if __name__ == '__main__':
    if len(sys.argv)<2:
        print('syntax is activity.py <fname>')
    else:
        main(str(sys.argv[1]))
