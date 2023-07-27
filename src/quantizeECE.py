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
        m = re.search('.*(\d+)_.*\.h5',fname)

    if len(flist)==0:
        print('no files worked')
        return

    chankeys = list(flist[0]['ece']['edges']['locations'].keys())
    nframes = []
    for f in flist:
        nframes += [f['ece']['edges']['nedges']['00'].shape[0]]
        for k in chankeys:
            allhits += list(f['ece']['edges']['locations'][k][()])

    quant.setbins(allhits)

    if plotting:
        plt.plot(quant.bincenters(),1000.0/(0.01 + quant.binwidths()))
        plt.plot(quant.bincenters(),quant.histogram(allhits))
        #plt.stairs(10000.0/(0.01 + quant.binwidths()),quant.binedges())
        #plt.stairs(quant.histogram(allhits),quant.binedges())
        plt.show()

    for j,f in enumerate(flist):
        data = np.zeros((len(chankeys),quant.nbins,nframes[j]),dtype=np.uint8)
        for c,k in enumerate(chankeys):
            ne = f['ece']['edges']['nedges'][k][()]
            a = 0
            for i in range(len(ne)):
                data[c,:,i] += quant.histogram(f['ece']['edges']['locations'][k][()][a:a+ne[i]]).astype(np.uint8)
                a += ne[i]
        shot = (re.search('.*\/(\d+)_.*\.h5',validfnames[j])).group(1)
        inds = np.where(data>0)
        print(inds)
        print(data[inds])
        print(np.max(data))
        print(data.shape)
        print('Writing shot_%s'%shot)
        with h5py.File('../quantized_data.h5','a') as o:
            o.create_dataset('shot_%s'%shot,data=data)
            o.create_dataset('shot_%s_qbins'%shot,data=quant.binedges())
            if plotting:
                plt.pcolor(data[35,:,:])
                plt.colorbar()
                plt.clim(0,2)
                plt.show()


    _=[f.close() for f in flist]
        



    return
    

if __name__ == '__main__':
    if len(sys.argv)<3:
        print('syntax: ./quantizeECE.py <nqbins> <list of filenames>')
    else:
        main(int(sys.argv[1]),sys.argv[2:])
