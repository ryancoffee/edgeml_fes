#!/usr/bin/python3
## for traverse  #!/home/rc8936/.conda/envs/rnc_fes/bin/python

import numpy as np
import sys
import os.path
import multiprocessing as mp
#from joblib import Parallel, delayed
from analysis import run_shot

import utils 

import argparse
parser = argparse.ArgumentParser(description='Parallel converter from ece and bes pickle files to .h5 processed spectrograms\nmain -ipath <ipath> -opath <opath> -nthreads <nthreads> <shots separated by sapce>')
parser.add_argument('-ipath', type=str,required=True, help='input path')
parser.add_argument('-opath', type=str,required=True, help='ouput path')
parser.add_argument('-nthreads',   type=int, default=4,required=True, help='Number of threads available to container')



class Params:
    def __init__(self,inpath,outpath,shot):
        self.inpath = inpath
        self.outpath = outpath
        self.shot = shot
        self.nsamples_ece = 1024
        self.nsamples_bes = 2048


def main():
    args, unparsed = parser.parse_known_args()
    if len(unparsed) == 0:
        print('No shots listed\nsyntax: main -ipath <ipath> -opath <opath> -nthreads <nthreads> <shots separated by sapce>\nProgram exiting ... ... ')
        exit(0)
    shotlist = [int(i) for i in list(unparsed)]
    print(shotlist)

    if not os.path.exists(args.ipath):
        print('Input path %s does not exist'%args.ipath)
        exit(0)

    if not os.path.exists(args.opath):
        os.makedirs(args.opath)

    paramslist = [Params(args.ipath,args.opath,shot) for shot in shotlist]
    '''
    for p in paramslist:
        p.setnangles(args.n_angles).setdrawscale(args.drawscale).settestsplit(args.testsplit).setdarkscale(args.darkscale).setsecondaryscale(args.secondaryscale)
    '''

    num_cores = mp.cpu_count()
    print(num_cores)

    #_ = Parallel(n_jobs=num_cores, require='sharedmem')(delayed(run_shot)(shot,params) for shot in shots)
    with mp.Pool(processes=len(paramslist)) as pool:
        pool.map(run_shot,paramslist)
    return

if __name__ == '__main__':
    main()
