#!/usr/bin/python3
import minisom
import numpy as np
import h5py
import math
import sys

'''
@misc{vettigliminisom,
  title={MiniSom: minimalistic and NumPy-based implementation of the Self Organizing Map},
  author={Giuseppe Vettigli},
  year={2018},
  url={https://github.com/JustGlowing/minisom/},
}
'''

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
    rng = np.random.default_rng()
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
    np.savetxt('tmphist2d.dat',h,fmt='%i')
    
    
    clusters = {'one':[233,10,190,5,33,20,180,50],'two':[120,30,60,40,220,20,200,10],'three':[40,50,150,25,60,50,128,32],'four':[128,64,128,64,128,64,128,64]}
    xvals = sampledist(clusters,nbins,nsamples,darkcounts)
    dims = list(xvals.keys())
    print(dims)
    data = [ [xvals[d][s] for d in dims] for s in range(len(xvals[dims[0]])) ]
    print(len(data))

    som = minisom.MiniSom(16,16,len(dims),sigma=8,learning_rate=.5)
    som.train(data,3000)
    inds = np.arange(len(xvals[dims[0]]))
    rng.shuffle(inds)

    with open('tmpout.dat','w') as f:
        _= [print('%i\t%i\t%i'%(i,som.winner(data[i])[0],som.winner(data[i])[1]),file=f) for i in inds]

    print(som.get_weights().shape)
    _=[ np.savetxt('som_weights_%i.dat'%i,som.get_weights()[:,:,i],fmt='%.2f') for i in range(som.get_weights().shape[-1])]

    return

if __name__ == '__main__':
    main()
