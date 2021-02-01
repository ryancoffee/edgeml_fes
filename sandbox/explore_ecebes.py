#!/home/rc8936/.conda/envs/rnc_fes/bin/python

import numpy as np
import h5py
import sys

def getextrema(t1,t2):
    tmin = np.max([np.min(t1),np.min(t2)])
    tmax = np.min([np.max(t1),np.max(t2)])
    return tmin,tmax

def main():
    path = '/projects/EKOLEMEN/ecebes'
    shot = 122117
    if len(sys.argv)>1:
        shot = int(sys.argv[1])
    ecefile = '%s/%i%s'%(path,shot,'ECE')
    besfile = '%s/%i%s'%(path,shot,'BES')
    data_ece = np.load(ecefile,allow_pickle=True)
    data_bes = np.load(besfile,allow_pickle=True)
    t_ece = ((data_ece['ecevf01']['data.time']+0.00025)*1e3).astype(int)
    t_bes = ((data_bes['besfu01']['data.time']+0.00025)*1e3).astype(int)
    #print('ece [%i]\t'%t_ece.shape[0],np.min(t_ece),np.max(t_ece))
    #print('bes [%i]\t'%t_bes.shape[0],np.min(t_bes),np.max(t_bes))
    tmin,tmax = getextrema(t_bes,t_ece)
    print(tmin,tmax)
    inds_ece_coince = np.where((t_ece>tmin) * (t_ece<tmax))
    inds_bes_coince = np.where((t_bes>tmin) * (t_bes<tmax))
    sz_ece = t_ece[inds_ece_coince].shape[0]
    sz_bes = t_bes[inds_bes_coince].shape[0]
    print(sz_ece,sz_bes,(sz_bes-2*sz_ece))

    return

if __name__ == '__main__':
    main()
