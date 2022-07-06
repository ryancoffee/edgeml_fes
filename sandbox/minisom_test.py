#!/usr/bin/python3
import minisom
import numpy as np
import h5py
import math
import sys

def erf(x,xc,w):
    if (x<(xc-w)): return 0.
    if (x>(xc+w)): return 1.
    return 0.5*(1+math.sin(np.pi/2.*(x-xc)/w))

def sampledist(clusters,nbins,nsamples,darkcounts):
    rng = np.random.default_rng()
    y = {}
    xall = np.arange(nbins)
    dims = []
    ks = list(clusters.keys())
    dims = ['D%i'%i for i in range(len(clusters[ks[0]])//2)]
    for k in clusters.keys():
        y[k] = {}
        for i,d in enumerate(dims):
            y[k][d] = [erf(x,clusters[k][2*i],clusters[k][2*i+1]) for x in xall]
    xvals = {}
    for d in y[k].keys():
        xvals[d] = []
    for k in y.keys():
        for d in y[k].keys():
            drawvals = list(rng.random(nsamples)*y[k][d][-1])
            xvals[d] += list(np.interp(drawvals,y[k][d],xall))
            xvals[d] += list(rng.random(darkcounts)*nbins)
    return xvals

def main():
    bits = int(8)
    nbins = int(1)<<bits
    print('Starting with nbins = %i'%(nbins))

    print('Give me as arguments the number of samples and the number of darkcounts')
    nsamples = 1000
    darkcounts = 100

    if len(sys.argv)>2:
        nsamples = int(sys.argv[1])
        darkcounts = int(sys.argv[2])

    clusters = {'one':[233,10,190,5],'two':[120,30,60,40],'three':[40,50,150,25],'four':[128,64,128,64]}
    xvals = sampledist(clusters,nbins,nsamples,darkcounts)
    dims = list(xvals.keys())
    h,bx,by = np.histogram2d(xvals[dims[0]],xvals[dims[1]],bins=(np.arange(int(1)<<bits)))
    '''
    for i in range(len(xvals['oneone'])):
        print(xvals['oneone'][i],xvals['onetwo'][i])
    '''
    np.savetxt('tmphist2d.dat',h,fmt='%i')
    

    return

if __name__ == '__main__':
    main()
