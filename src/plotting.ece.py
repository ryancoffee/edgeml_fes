#!/sdf/sw/images/slac-ml/20211027.1/bin/python3
import h5py
import numpy as np
import matplotlib.pyplot as plt
import re
import sys

def main(fnames):
    headmatch = re.compile('(.*)\.h5')
    for fname in fnames:
        addresses = {}
        nedges = {}
        locations = {}
        slopes = {}
        bins ={}
        hist={}
        with h5py.File(fname,'r') as f:
            m = headmatch.match(fname)
            if m:
                chankeys = ['%02i'%i for i in range(10,38,4)]
                oname = '%s.ece.logic.png'%(m.group(1))
                fig,axs = plt.subplots(len(chankeys),1,figsize=(12,12),sharex=True,sharey=True)        
                _=[axs[i].imshow(f['ece']['logic'][k][()],vmin=-1e5,vmax=1e5,origin='lower') for i,k in enumerate(chankeys)]
                _=[axs[i].set_ylabel('freq [kHz]') for i in range(len(chankeys))]
                plt.xlabel('time [ms]') 
                plt.savefig(oname)

                for k in chankeys:
                    bins.update({k:np.arange(0,1<<10,step=4)}) ## HERE HERE HERE HERE for now doing uniform bins... basically undoing the params.expand.
                    nedges.update({k:f['ece']['edges']['nedges'][k][()]})
                    locations.update({k:f['ece']['edges']['locations'][k][()]})
                    slopes.update({k:f['ece']['edges']['slopes'][k][()]})
                    addresses.update({k:np.cumsum(f['ece']['edges']['nedges'][k][()])})
                    hist.update({k:[]})
                    for frame in range(f['ece']['logic'][k].shape[1]):
                        a = addresses[k][frame]
                        n = nedges[k][frame]
                        hist[k] += [np.histogram(locations[k][a:a+n],bins=bins[k])[0]]
                oname = '%s.ece.hist.png'%(m.group(1))
                fig,axs = plt.subplots(len(chankeys),1,figsize=(12,12),sharex=True,sharey=True)        
                _=[axs[i].imshow(np.array(hist[k]).T,vmin=0,vmax=1,origin='lower') for i,k in enumerate(chankeys)]
                _=[axs[i].set_ylabel('qbins') for i in range(len(chankeys))]
                plt.xlabel('time [ms]') 
                plt.savefig(oname)
                plt.show()

    return

if __name__ == '__main__':
    if len(sys.argv)<2:
        print('syntax: plotting.ece.py <fnames>')
    main(sys.argv[1:])

