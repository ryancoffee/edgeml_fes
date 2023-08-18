#!/sdf/group/lcls/ds/ana/sw/conda2/inst/envs/ps-4.6.0/bin/python 

import numpy as np
import h5py 
import sys
import re
import matplotlib.pyplot as plt
from Quantizers import Quantizer
import math

plotting = False

def main(nbins,fnames):
    flist = []
    shots = []
    validfnames = []
    quant = Quantizer(style='fusion',nbins=nbins)
    nunibins = 1<<10
    nubinsshift = 0

    for fname in fnames:
        print(fname)
        try:
            tmp = h5py.File(fname,'r')
            tmp.close()
            validfnames += [fname]
        except:
            print('fname %s failed to open'%fname)


    for fname in validfnames:
        m = re.search('.*\/(\d+)_.+\.h5',fname)
        if m:
            shots += [int(m.group(1))]
        flist += [h5py.File(fname,'r')]
        if (nubinsshift==0) and (flist[-1]['ece'].attrs['expand']>1):
            nubinsshift = np.uint8(math.log2(flist[-1]['ece'].attrs['expand']))

    if len(flist)==0:
        print('no files worked')
        return

    chankeys = list(flist[0]['ece']['edges']['locations'].keys())
    '''
    allhits_hist = {} 
    for k in chankeys:
        allhits_hist[k] = np.zeros((len(unibins)-1,),dtype=int)
    '''
    unibins = np.arange(nunibins<<nubinsshift,dtype=int)
    allhits_hist = np.zeros((len(unibins)-1,),dtype=int)

    nframes = []
    for f in flist:
        nframes += [f['ece']['edges']['nedges']['00'].shape[0]]
        for k in chankeys:
            allhits_hist += np.histogram(f['ece']['edges']['locations'][k][()],unibins)[0]

    quant.setbins_from_hist(allhits_hist,unibins)

    if plotting:
        plt.plot(quant.bincenters(),1000.0/(0.01 + quant.binwidths()))
        plt.show()

    qpath = '/sdf/scratch/coffee/edgeml_fes_quantized'
    for j,f in enumerate(flist):
        data = np.zeros((len(chankeys),quant.nbins,nframes[j]),dtype=np.uint8)
        for c,k in enumerate(chankeys):
            ne = f['ece']['edges']['nedges'][k][()]
            a = 0
            for i in range(len(ne)):
                data[c,:,i] += quant.histogram(f['ece']['edges']['locations'][k][()][a:a+ne[i]]).astype(np.uint8)
                a += ne[i]
        #shot = (re.search('.*\/(\d+)_.*\.h5',validfnames[j])).group(1)
        print('Writing shot_%i\tdata.shape = %s'%(shots[j],str(data.shape)))
        with h5py.File('%s/quantized_data_shots%i-%i.h5'%(qpath,shot[0],shot[-1]),'a') as o:
            o.create_dataset('shot_%i'%shots[j],data=data)
            o.create_dataset('shot_%i_qbins'%shots[j],data=quant.binedges())
            if plotting:
                plt.pcolor(np.sum(data,axis=0))
                plt.colorbar()
                plt.show()

    _=[f.close() for f in flist]
        



    return
    

if __name__ == '__main__':
    if len(sys.argv)<3:
        print('syntax: ./quantizeECE.py <nqbins> <list of filenames>')
    else:
        main(int(sys.argv[1]),sys.argv[2:])
