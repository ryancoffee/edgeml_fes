#!/usr/bin/python3

import h5py
import re
import numpy as np
from scipy.fftpack import dct,dst,rfft,irfft
from scipy import fft, stats
import os
import utils

#'BESFU', 'BESSU', 'ece', 'ecevs' the new channel names in shot files


def run_shot(params):

    inpath = params.inpath
    outpath = params.outpath
    outfile = '%s/%s_fft.h5'%(outpath,params.shot)

    filename = '%s/ecebes_%06i.h5'%(params.inpath,params.shot)

    with h5py.File(filename,'r') as f:
        params.initTimesChans(f)
        print('entering fillData')
        params.fillData(f)

    print('pid%i\tshot %i\tsz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i\ttmin,tmax = (%i,%i)'%(params.getProcID(),params.shot,params.sz['ece'],params.sz['bes'],(params.sz['bes']-2*params.sz['ece']),params.t['min'],params.t['max']))

    with h5py.File(outfile,'w') as o:
        params.initH5(o)
        params.process(o)
        #closing with h5py.File() as f
    return
