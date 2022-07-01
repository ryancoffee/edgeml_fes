#!/usr/bin/python3

import h5py
import numpy as np
import utils
import myEncodings
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


def addsentences(inname,outname,args):
    with h5py.File(inname,'r') as infile:     ## f as infilehandle
        nfreqs = {}
        nsteps = {}
        nviews = {}
        sz = {}
        d = {}
        detlist = list(infile.keys())
        for det in detlist:
            chanlist[det] = list(infile[det]['directional'].keys())
            (nf,ns,nv) = infile[det]['directional'][chanlist[0]][()].shape
            nfreqs[det] = nf
            nsteps[det] = ns
            nviews[det] = nv
        if args.contract > 1:
            sz[det] = np.uint16( max(64 , nfreqs[det] // args.contract) )
        else:
            sz[det] = np.uint16(nfreqs[det]*args.expand)
        print(sz['ece'],sz['bes'])
        if nsteps['ece'] != nsteps['bes']:
            print('failed nsteps[\'ece\'] != nsteps[\'bes\']')
            return
        for det in detlist:
            d[det] = [infile[det]['directional'][chan][()] for chan in chanlist[det]]


    outdata = {}
    ecedata =  [d['ece'][ch] for ch in range(len(d['ece']))]
    besdata =  [d['bes'][ch] for ch in range(len(d['bes']))]
    paramslist = [StepParams(ecedata[:][:,step,:],besdata[:][:,step,:],outdata,nfreqs,nsteps,nviews,sz,step,split=0.1) for step in range(nsteps)] 
    with mp.Pool(processes=len(paramslist)) as pool:
        pool.map(addstep,paramslist)

    with h5py.File(outname,'w') as outfile: 
        for step in range(nsteps):
            outfile.create_group('step_%06i'%step)


class StepParams:
    def __init__(self,ecedata,besdata,outdata,nfreqs,nsteps,nviews,step,split):
        self.ecedata = ecedata
        self.besdata = besdata
        self.outdata = outdata
        self.nchansece = len(ecedata)
        self.nchansbes = len(besdata)
        self.nfreqs = nfreqs
        self.nviews = nviews
        self.nsteps = nsteps
        self.sz = sz
        self.step = step
        self.split = split

    def nwords(self,detstr):
        return self.sz[detstr]




def addstep(params):
    print('step:\t%i'%params.step)
    outdata['step:\t%i'%params.step] = {}
    ## for each detector 'ece' and 'bes' we need to create an (nchans,nview,nwords) 3D np array of uint64
    params.outdata['ece'] = np.ndarray((params.ncahansece,params.nviews,params.nwordsece),dtype=np.uint64)
    params.outdata['bes'] = np.ndarray((params.ncahansbes,params.nviews,params.nwordsbes),dtype=np.uint64)


                        of.create_group(det)
                        story = of[det].create_group('directional')
                        d = f[det]['directional']
HERE HERE HERE HERE somehow... catch back up.

    for step in range(nsteps):
        paragraph = story.create_group('step_%06i'%step) #### Somehow need to use h5py.opaque_dtype() I think
        for chan in chanlist: ## for every sentence build the words
            overcount = int(0)
            sentences = []
            for v in range(nviews): # for every word build the character string
                if params.contract > 1:
                    tmp = utils.scanedges( d[chan][()][:,step,v] ,thresh=args.thresh,expand=1) 
                    # expand = 4, for ece this means edges run 0:2048 rather than original 0:512... bes would go to 4096
                    edges = [int(val/params.contract) for val in tmp]
                else:
                    edges = utils.scanedges( d[chan][()][:,step,v] ,thresh=args.thresh,expand=args.expand) 
                words['bes'],oc = myEncodings.encode( edges['bes'] , sz=sz['bes'])  
                overcount['bes'] += oc
                words['ece'],oc = myEncodings.encode( edges['ece'] , sz=sz['ece'])  
                overcount['ece'] += oc
                #print(len(words))
                sentences += [words]
            ## now I have a sentence for every timestep
            paragraph.create_dataset('%s'%chan,data=np.stack(sentences,axis=-1),dtype=np.uint64) #### Somehow need to use h5py.opaque_dtype() I think
            if overcount>0:
                paragraph.attrs.create('overcount',data = overcount)
                print(overcount)
    return story


def main():
    args, unparsed = parser.parse_known_args()
    for fname in args.infiles: ## for every infilename
            m = re.search('^.*/(\d+_\w+).h5$',fname)
            ofname = '%s.edges.h5'%(fname)
            if m:
                ofname = '%s/%s.edges.h5'%(args.opath,m.group(1))
                    addsentences(inname,outname,args)
    return


if __name__ == '__main__':
    main()
