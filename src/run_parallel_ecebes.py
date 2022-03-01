#!/usr/bin/python3
## for traverse  #!/home/rc8936/.conda/envs/rnc_fes/bin/python

import numpy as np
import os.path
import multiprocessing as mp
#from joblib import Parallel, delayed
from analysis import run_shot, Params

import argparse
parser = argparse.ArgumentParser(description='Parallel converter from ece and bes pickle files to .h5 processed spectrograms\nmain -ipath <ipath> -opath <opath> -nthreads <nthreads> <shots separated by sapce>')
parser.add_argument('-ipath', type=str,required=True, help='input path')
parser.add_argument('-opath', type=str,required=True, help='ouput path')
parser.add_argument('-nthreads',   type=int, default=4,required=False, help='Number of threads available, only parallelize of num shots though')
parser.add_argument('-nsamples_bes',   type=int, default=1024,required=False, help='Number of bes digitizer samples per DCT window')
parser.add_argument('-nsamples_ece',   type=int, default=512,required=False, help='Number of ece digitizer samples per DCT window')
parser.add_argument('-shots',   type=int, nargs='+',required=True, help='Number of ece digitizer samples per DCT window')



'''
Joe Abbate  6:23 AM
hey ryan sorry again for missing your email!
￼
￼
￼
￼
￼
6:24
"Let me guess... you use the magnetics from slow sensors to reconstruct the location from which the cyclotron frequency was emitted corresponding to that ece channel. Since it's a slow variable, you only measure every 50 ms or so. The vector of values and times shows the location drift of the channel throughout the shot. Is that right? We would interpolate in order to assign the spectrogram patches that Alan is working with to a fixed location in the lab frame."
6:25
that's exactly right yup!

'''

def main():
    args, unparsed = parser.parse_known_args()
    if not len(args.shots) > 0:
        print('No shots listed\nsyntax: main -ipath <ipath> -opath <opath> -nthreads <nthreads> -shots <shots separated by sapce>\nProgram exiting ... ... ')
        exit(0)
    print(args.shots)

    if not os.path.exists(args.ipath):
        print('Input path %s does not exist'%args.ipath)
        exit(0)

    if not os.path.exists(args.opath):
        os.makedirs(args.opath)


    paramslist = [Params(args.ipath,args.opath,shot,nece=args.nsamples_ece,nbes=args.nsamples_bes) for shot in args.shots]
    #_ = [p.setnsamples_ece(args.nsamples_ece).setnsamples_bes(args.nsamples_bes) for p in paramslist]

    num_cores = mp.cpu_count()
    print(num_cores)

    with mp.Pool(processes=len(paramslist)) as pool:
        pool.map(run_shot,paramslist)
    return

if __name__ == '__main__':
    main()
