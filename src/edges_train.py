#!/usr/bin/python3

import h5py
import numpy as np
import utils
import myEncodings
import bitstring as bs
import re
import os
import gmpy2
import multiprocessing as mp

import argparse
parser = argparse.ArgumentParser(description='edges.h5 file to training dataset\nmain -opath <opath> -nthreads <nthreads> -infiles <.h5 filenames separated by sapce>')
parser.add_argument('-opath', type=str,required=True, help='ouput path')
parser.add_argument('-nthreads',   type=int, default=1,required=False, help='Number of threads available, only parallelize of num shots though')
parser.add_argument('-test',   type=float, default=0.1,required=False, help='Hold out for testing (default 0.2)')
parser.add_argument('-infiles',   type=str, nargs='+',required=True, help='list of *.edges.h5 filenames')



class ConvertParams:
    def __init__(self,ofile,dece,dbes,stepin,split=float(0)):
        self.ofile = ofile
        self.d_ece = dece
        self.d_bes = dbes
        self.step = stepin
        self.split = split
        self.testflag = False
        if split>float(0) and np.random.rng_default.normal()<split:
            self.testflag = True
        return

    def istest(self):
        return self.testflag

    def settest(self):
        self.testflag = True
        return self

def runstep(params):
    # _=[[[print(bin(d[k][()][i,j]) ) for j in range(d[k][()].shape[1]) ] for i in range(d[k][()].shape[0])] for k in list(d.keys())]
    ## here, turn binary to multi-hot encoding input to MLP autoencoder... define for TF the custom loss for binary distance
    ## 
    chanlist = [params.d_ece[step][c] for c in list( params.d_ece[step].keys() ) ]
    for chan in chanlist:
        for direction in range(chan.shape[-1]):
            print(myEncodings.decode(chan[:][direction]) )
    return

def main():
    args, unparsed = parser.parse_known_args()

    num_cores = mp.cpu_count()
    print("n_cores = %i"%(num_cores))

    for fname in args.infiles:
        with h5py.File(fname,'r') as infile:     ## f as infile handle
            m = re.search('^.*/(\d+_\w+.edges).h5$',fname)
            if m:
                ofname = '%s/%s.train.h5'%(args.opath,m.group(1))
                with h5py.File(ofname,'w') as ofile: 
                    #for det in list(infile.keys()): # ['ece','bes']:
                    d_ece = infile['ece']['directional']
                    d_bes = infile['bes']['directional']
                    paramslist = [ConvertParams(d_ece,d_bes,step,split=0.1) for step in list(d.keys())]
                    paramslist.outh5(ofile)
                    with mp.Pool(processes=len(paramslist)) as pool:
                        pool.map(runstep,paramslist)
    return

if __name__ == '__main__':
    main()
