#!/sdf/group/lcls/ds/ana/sw/conda2/inst/envs/ps-4.6.0/bin/python 

import numpy as np
import h5py 
import sys
import re
import matplotlib.pyplot as plt
from Quantizers import Quantizer

plotting = False

def main(nbins,fnames):
    allhits = []
    flist = []
    validfnames = []
    quant = Quantizer(style='fusion',nbins=nbins)

    for fname in fnames:
        print(fname)
        try:
            tmp = h5py.File(fname,'r')
            tmp.close()
            validfnames += [fname]
        except:
            print('fname %s failed to open'%fname)


    #print("\n\n\tOK now trying to create a list of open files\n")
    for fname in validfnames:
        #print(fname)
        flist += [h5py.File(fname,'r')]

    if len(flist)==0:
        print('no files worked')
        return

    chankeys = list(flist[0]['ece']['edges']['locations'].keys())
    for f in flist:
        for k in chankeys:
            allhits += list(f['ece']['edges']['locations'][k][()])

    quant.setbins(allhits)

    if plotting:
        #plt.plot(quant.bincenters(),1000.0/(0.01 + quant.binwidths()))
        #plt.plot(quant.bincenters(),quant.histogram(allhits))
        plt.stairs(10000.0/(0.01 + quant.binwidths()),quant.binedges())
        plt.stairs(quant.histogram(allhits),quant.binedges())
        plt.show()

    with h5py.File('./data.h5','w') as o:
        for j,f in enumerate(flist):
            data = np.zeros((len(chankeys),quant.nbins,10000))
            for c,k in enumerate(chankeys):
                ne = f['ece']['edges']['nedges'][k][()]
                for i in range(len(ne)):
                    a = np.sum(ne[:i])
                    data[c,:,i] += quant.histogram(f['ece']['edges']['locations'][k][()][a:a+ne[i]])
            shot = re.search('\/\d+_fft.h5',validfnames[j])
            print(shot)
            o.create_dataset(shot,data=data)
            if plotting:
                plt.pcolor(np.sum(data[10:13,:,:],axis=0))
                plt.colorbar()
                plt.clim(0,2)
                plt.show()
            inds = np.where(data>0)
            print(inds)
            print(data[inds])
            print(np.max(data))
            print(data.shape)


    _=[f.close() for f in flist]
        



    return
    

if __name__ == '__main__':
    if len(sys.argv)<3:
        print('syntax: ./quantizeECE.py <nqbins> <list of filenames>')
    else:
        main(int(sys.argv[1]),sys.argv[2:])
