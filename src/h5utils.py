#!/usr/bin/python3

import h5py

def loadch(fname='145387_dct.h5',det='bes',ch=42,chstring='_max_directional'):
    f = h5py.File(fname,'r')
    d = f['%s'%det]['%i%s'%(ch,chstring)][()]
    f.close()
    return d

