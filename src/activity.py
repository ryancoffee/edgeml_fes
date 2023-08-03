#!/sdf/group/lcls/ds/ana/sw/conda2/inst/envs/ps-4.6.0/bin/python 

import numpy as np
import h5py
import matplotlib.pyplot as plt
import sys

def process(fname,outmat):
    with h5py.File(fname) as f:
        ntimes = f['ece']['edges']['nedges']['00'].shape[0]
        chans = list(f['ece']['edges']['nedges'].keys())
        outmat = np.zeros((len(chans),ntimes),dtype=np.uint8)
        for i,c in enumerate(chans):
            outmat[i,:]=f['ece']['edges']['nedges'][c][()]
    return outmat

def main(fname):
    outmat = np.zeros((1,),dtype=np.uint8)
    outmat = process(fname,outmat)
    plt.pcolor(outmat)
    plt.clim(0,1<<4)
    plt.colorbar()
    plt.show()

if __name__ == '__main__':
    if len(sys.argv)<2:
        print('syntax is activity.py <fname>')
    else:
        main(str(sys.argv[1]))
