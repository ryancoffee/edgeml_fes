#!/usr/bin/python3

import h5py
import numpy as np
import utils
import encodings
import bitstring as bs
import re
import os
import multiprocessing as mp

import argparse
parser = argparse.ArgumentParser(description='Parallel scanner for finding spectrogram modes from .h5 files\nmain -opath <opath> -nthreads <nthreads> -infiles <.h5 filename separated by sapce>')
parser.add_argument('-opath', type=str,required=True, help='ouput path')
parser.add_argument('-nthreads',   type=int, default=4,required=False, help='Number of threads available, only parallelize of num shots though')
parser.add_argument('-thresh', type=int, default=200,required=False,help='threhsold for directional features (200) ')
parser.add_argument('-expand', type=int, default=1,required=False,help='exand hist resolution (1=no change), e.g. res = unique(int(edges*expand))')
parser.add_argument('-contract', type=int, default=1,required=False,help='contract hist resolution (1=no change), e.g. res = unique(int(edges//contract))')
parser.add_argument('-infiles',   type=str, nargs='+',required=True, help='list of .h5 filenames')


def addsentences(story,d,args):
    chanlist = list(d.keys())
    (nfreqs,nsteps,nviews) = d[chanlist[0]][()].shape
    if args.contract > 1:
        sz = np.uint16( max(64 , nfreqs // args.contract) )
    else:
        sz = np.uint16(nfreqs*args.expand)
    print(sz)
    for step in range(nsteps):
        print('step:\t%i'%step)
        paragraph = story.create_group('step_%06i'%step) #### Somehow need to use h5py.opaque_dtype() I think
        for chan in chanlist: ## for every sentence build the words
            sentences = []
            for v in range(nviews): # for every word build the character string
                if args.contract > 1:
                    tmp = utils.scanedges( d[chan][()][:,step,v] ,thresh=args.thresh,expand=1) 
                    # expand = 4, for ece this means edges run 0:2048 rather than original 0:512... bes would go to 4096
                    edges = np.unique( [int(val/args.contract) for val in tmp] )
                else:
                    edges = np.unique( utils.scanedges( d[chan][()][:,step,v] ,thresh=args.thresh,expand=args.expand) )
                words = encodings.encode( edges , sz=sz)  
                #print(len(words))
                sentences += [words]
            ## now I have a sentence for every timestep
            paragraph.create_dataset('%s'%chan,data=np.stack(sentences,axis=-1),dtype=np.uint64) #### Somehow need to use h5py.opaque_dtype() I think
    return story


def main():
    args, unparsed = parser.parse_known_args()
    for fname in args.infiles: ## for every infilename
        with h5py.File(fname,'r') as f:     ## f as infilehandle
            m = re.search('^.*/(\d+_\w+).h5$',fname)
            ofname = '%s.edges.h5'%(fname)
            if m:
                ofname = '%s/%s.edges.h5'%(args.opath,m.group(1))
                with h5py.File(ofname,'w') as of: 
                    for det in ['ece','bes']:
                        of.create_group(det)
                        story = of[det].create_group('directional')
                        d = f[det]['directional']
                        story = addsentences(story,d,args)
    return

if __name__ == '__main__':
    main()
