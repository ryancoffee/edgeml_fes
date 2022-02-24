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
parser.add_argument('-thresh', type=int, default=200,required=False,help='threhsold for directional features (200) ')
parser.add_argument('-expand', type=int, default=1,required=False,help='exand hist resolution (1=no change), e.g. res = unique(int(edges*expand))')
parser.add_argument('-contract', type=int, default=1,required=False,help='contract hist resolution (1=no change), e.g. res = unique(int(edges//contract))')
parser.add_argument('-infiles',   type=str, nargs='+',required=True, help='list of .h5 filenames')

def encode(edges):
    s = 0b0
    for e in edges:
        s += 2**int(e)
    return s

def decode(s):
    l = []
    return l

'''
reserved for use in decode section
                            binfmtstr = '08b'
                            if expand >0:
                                binfmtstr = '0%ib'%(d.shape[0]*expand+4)
                            else:
                                binfmtstr = '0%ib'%(d.shape[0]//abs(expand)+4)
'''

def addsentences(story,d,args):
    chanlist = list(d.keys())
    (nfreqs,nsteps,nviews) = d[chanlist[0]][()].shape
    sentence = []
    for step in range(nsteps):
        for chan in chanlist: ## for every sentence build the words
            word = []
            for v in range(nviews): # for every word build the character string
                if args.expand >= 1:
                    edges = np.unique( utils.scanedges( d[chan][()][:,step,v] ,thresh=args.thresh,expand=args.expand) )
                else:
                    tmp = utils.scanedges( d[chan][()][:,step,v] ,thresh=args.tresh,expand=1) 
                    # expand = 4, for ece this means edges run 0:2048 rather than original 0:512... bes would go to 4096
                    edges = np.unique( [int(val/args.contract) for val in tmp] )
                word += [ encode( edges ) ] 
            sentence += [ np.array(word) ]
            ## now I have a sentence for every timestep
            story.create_dataset('sentence_%06i'%step,data=np.stack(sentence,axis=1),dtype='B') #### Somehow need to use h5py.opaque_dtype() I think
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
                        '''
                        OK, now for each detector (each timestep), there will be 4 directional vectors (views) of hist, 
                        each view encoded as a binary that is N-bits long, where N is the number of discrete "frequencies" 
                        in the spectrogram, such that each "view" is a "character"
                        The list of encoded "characters" along the direction dimension makes a "word" for each channel.
                        The list of "words" for all channels make a "sentence" that gets added to our "story" of time-steps.

                        First get the number of timesteps using channel 0
                        '''
                        d = f[det]['directional']
                        story = addsentences(story,d,args)

    return

if __name__ == '__main__':
    main()
