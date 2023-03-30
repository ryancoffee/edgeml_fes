#!/sdf/sw/images/slac-ml/20211027.1/bin/python3

import numpy as np
import h5py 
import sys
import re
import matplotlib.pyplot as plt

def main(nbins,fnames):
    allhits = {}
    allquants = {}
    flist = [h5py.File(fname,'r') for fname in fnames]
    chankeys = list(flist[0]['ece']['edges']['locations'].keys())
    for k in chankeys:
        allhits.update({k:[]})
        allquants.update({k:Quantizer})
    for f in flist:
        for k in chankeys:
            allhits[k] += list(f['ece']['edges']['locations'][k][()])
    _=[f.close() for f in flist]
    
    for i,k in enumerate(chankeys):
        h,b = np.histogram(allhits[k],nbins)
        plt.plot((b[:-1]+b[1:])/2.,20*i+h)
    plt.xlim(0,256)
    plt.ylim(0,1e3)
    plt.show()
    return

if __name__ == '__main__':
    if len(sys.argv)<3:
        print('syntax: ./quantizeECE.py <nqbins> <list of filenames>')
    else:
        main(int(sys.argv[1]),sys.argv[2:])
