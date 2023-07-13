#!/sdf/sw/images/slac-ml/20211027.1/bin/python3

import numpy as np
import h5py 
import sys
import re
import matplotlib.pyplot as plt
from Quantizers import Quantizer

plotting = True

def main(nbins,fnames):
    allhits = []
    quant = Quantizer(style='fusion',nbins=nbins)
    flist = [h5py.File(fname,'r') for fname in fnames]
    chankeys = list(flist[0]['ece']['edges']['locations'].keys())
    for f in flist:
        for k in chankeys:
            allhits += list(f['ece']['edges']['locations'][k][()])
    _=[f.close() for f in flist]
    
    quant.setbins(allhits)
    if plotting:
        plt.plot(quant.bincenters(),1000.0/(0.01 + quant.binwidths()))
        plt.plot(quant.bincenters(),quant.histogram(allhits))
        plt.show()
    return

if __name__ == '__main__':
    if len(sys.argv)<3:
        print('syntax: ./quantizeECE.py <nqbins> <list of filenames>')
    else:
        main(int(sys.argv[1]),sys.argv[2:])
