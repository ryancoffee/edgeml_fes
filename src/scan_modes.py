#!/usr/bin/python3

import h5py
import numpy as np
import utils
import bitstring as bs
import re
import os

import argparse
parser = argparse.ArgumentParser(description='Parallel scanner for finding spectrogram modes from .h5 files\nmain -opath <opath> -nthreads <nthreads> -infiles <.h5 filename separated by sapce>')
parser.add_argument('-opath', type=str,required=True, help='ouput path')
parser.add_argument('-nthreads',   type=int, default=4,required=False, help='Number of threads available, only parallelize of num shots though')
parser.add_argument('-infiles',   type=str, nargs='+',required=True, help='list of .h5 filenames')

def main():
    args, unparsed = parser.parse_known_args()
    expand = -8
    for fname in args.infiles:
        with h5py.File(fname,'r') as f:
            m = re.search('^.*/(\d+_\w+).h5$',fname)
            ofname = '%s.edges.h5'%(fname)
            if m:
                ofname = '%s/%s.edges.h5'%(args.opath,m.group(1),chan,v)
            with h5py.File(ofname,'w') as of:
                for det in ['ece','bes']:
                    of.create_group(det)
                    chanlist = list(f[det]['directional'].keys()) 
                    for chan in chanlist:
                        d = f[det]['directional'][chan][()]
                        of[det].create_group(chan)
                        binfmtstr = '08b'
                        if expand >0:
                            binfmtstr = '0%ib'%(d.shape[0]*expand+4)
                        else:
                            binfmtstr = '0%ib'%(d.shape[0]//abs(expand)+4)
                        print(binfmtstr)
                        barrays = {}
                        for v in range(d.shape[2]): # v for directional view
                            barrays[v] = []
                            for s in range(d.shape[1]): # s for time step
                                result = 0b0
                                if expand > 0:
                                    edges = np.unique( utils.scanedges(d[:,s,v],thresh=300,expand=expand) ) # expand = 4, for ece this means edges run 0:2048 rather than original 0:512... bes would go to 4096
                                else:
                                    tmp = utils.scanedges(d[:,s,v],thresh=300,expand=1) # expand = 4, for ece this means edges run 0:2048 rather than original 0:512... bes would go to 4096
                                    edges = np.unique( [int(v/abs(expand)) for v in tmp] )

                                for e in edges:
                                    result += 2**int(e)
                                    sparseout.append([int(e),s,v])
                                barrays[v] += [format(result,binfmtstr)]
                                print(m.group(1))
                                of[det][chan].create_dataset('v%i'%v,data=)
                                '''
                                for s in range(len(barrays[v])):
                                    of.write(barrays[v][s])
                                    of.write(os.linesep)
                                '''


                                #  bin(a^b).count('1') this is the equiv to sum square error
                                #  bin(a|b) this is a sum of vectors that the bits saturate at 1, sort of an if any then 1 

    return

if __name__ == '__main__':
    main()
