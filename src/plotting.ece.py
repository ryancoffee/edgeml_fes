#!/sdf/sw/images/slac-ml/20211027.1/bin/python3
import h5py
import numpy as np
import matplotlib.pyplot as plt
import re
import sys

saveplots = True
plotqplots = False
spectrogram = False
channelmovie = True

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
                chankeys = ['%02i'%i for i in range(10,28,4)]
                if plotqplots:
                    oname = '%s.ece.logic.png'%(m.group(1))
                    fig,axs = plt.subplots(len(chankeys),1,figsize=(12,12),sharex=True,sharey=True)        
                    _=[axs[i].imshow(f['ece']['logic'][k][()],vmin=-1e5,vmax=1e5,origin='lower') for i,k in enumerate(chankeys)]
                    _=[axs[i].set_ylabel('freq [kHz]') for i in range(len(chankeys))]
                    plt.xlabel('time [ms]') 
                    if saveplots:
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
                    _=[axs[i].pcolor(np.array(hist[k]).T,vmin=0,vmax=1) for i,k in enumerate(chankeys)]
                    _=[axs[i].set_ylabel('qbins') for i in range(len(chankeys))]
                    plt.xlabel('time [ms]') 
                    if saveplots:
                        plt.savefig(oname)
                plt.show()
                #for k in chankeys[-1:]:
                if spectrogram:
                    for k in ['%02i'%i for i in range(1,48,1)]:
                        d = f['ece']['spect'][k][()][:,1500:2500]
                        X,Y = np.meshgrid(np.arange(d.shape[1]+1),np.arange(d.shape[0]+1,dtype=float)/2.)
                        fig = plt.figure(figsize=(12,6))
                        axs = fig.add_subplot(111)
                        im = axs.pcolor(X,Y,d,vmax=float(1<<14))
                        fig.colorbar(im,ax=axs,extend='max')
                        plt.xlabel('time [ms]')
                        plt.ylabel('freq. [kHz]')
                        if saveplots:
                            oname = '%s.ece.spect%s.png'%(m.group(1),k)
                            plt.savefig(oname)
                        #plt.show()
                        fig.close()
                if channelmovie:
                    imseq = [i for i in range(1500,2500,1)]
                    chankeys = ['%02i'%i for i in range(40) if not i==27] # really only 40 channels with data
                    #chankeys = ['%02i'%i for i in range(len(list(f['ece']['spect'].keys()))) if not i==27]
                    d = np.zeros((f['ece']['spect']['10'].shape[0],len(chankeys)),dtype=np.uint16)
                    X,Y = np.meshgrid(np.arange(d.shape[1]+1),np.arange(d.shape[0]+1,dtype=float)/2.)
                    b = np.arange(0,1<<10,step=4) ## HERE HERE HERE HERE for now doing uniform bins... basically undoing the params.expand.
                    h = np.zeros((b.shape[0]-1,len(chankeys)),dtype=np.uint8)
                    HX,HY = np.meshgrid(np.arange(h.shape[1]+1),np.arange(h.shape[0]+1))

                    for c,ck in enumerate(chankeys):
                        nedges.update({ck:f['ece']['edges']['nedges'][ck][()]})
                        locations.update({ck:f['ece']['edges']['locations'][ck][()]})
                        slopes.update({ck:f['ece']['edges']['slopes'][ck][()]})
                        addresses.update({ck:np.cumsum(f['ece']['edges']['nedges'][ck][()])})

                    for i in imseq:
                        if i%100==0: print('working image %i'%i)
                        oname = '%s.ece.spect.frame%04i.png'%(m.group(1),i)
                        for c,ck in enumerate(chankeys):
                            d[:,c] = f['ece']['spect'][ck][()][:,i]
                        fig = plt.figure(figsize=(6,5))
                        axs = fig.add_subplot(111)
                        im = axs.pcolor(X,Y,d,vmax=np.uint16(1<<13))
                        #fig.colorbar(im,ax=axs,extend='max')
                        plt.xlabel('spatial channel')
                        plt.ylabel('freq. [kHz]')
                        plt.title('time = %04i ms'%i)
                        plt.savefig(oname)
                        plt.close()


                        oname = '%s.ece.spect.quant%04i.png'%(m.group(1),i)
                        for c,ck in enumerate(chankeys):
                            a = addresses[ck][i]
                            n = nedges[ck][i]
                            h[:,c] = np.histogram(locations[ck][a:a+n],bins=b)[0]
                        fig = plt.figure(figsize=(6,5))
                        axs = fig.add_subplot(111)
                        im = axs.pcolor(HX,HY,h,vmax=1)
                        #fig.colorbar(im,ax=axs,extend='max')
                        plt.xlabel('spatial channel')
                        plt.ylabel('qbin')
                        plt.title('time = %04i ms'%i)
                        plt.savefig(oname)
                        plt.close()
                


    return

if __name__ == '__main__':
    if len(sys.argv)<2:
        print('syntax: plotting.ece.py <fnames>')
    main(sys.argv[1:])

