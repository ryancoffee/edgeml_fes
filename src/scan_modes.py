#!/usr/bin/python3

import h5py
import numpy as np
import utils

import argparse
parser = argparse.ArgumentParser(description='Parallel scanner for finding spectrogram modes from .h5 files\nmain -opath <opath> -nthreads <nthreads> -infiles <.h5 filename separated by sapce>')
parser.add_argument('-opath', type=str,required=True, help='ouput path')
parser.add_argument('-nthreads',   type=int, default=4,required=False, help='Number of threads available, only parallelize of num shots though')
parser.add_argument('-infiles',   type=str, nargs='+',required=True, help='list of .h5 filenames')

def main():
    args, unparsed = parser.parse_known_args()
    for fname in args.infiles:
        with h5py.File(fname,'r') as f:
            d = f['ece']['directional']['05'][()]
            sparseout = []
            for v in range(d.shape[2]): # v for directional view
                for s in range(d.shape[1]): # s for time step
                    for e in utils.scanedges(d[:,s,v],thresh=300,expand=4): # expand = 4, for ece this means edges run 0:2048 rather than original 0:512... bes would go to 4096
                        sparseout.append([int(e),s,v])
            

    return

if __name__ == '__main__':
    main()
