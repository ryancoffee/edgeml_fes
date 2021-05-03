#!/usr/bin/python3

import numpy as np
from h5utils import *
import cv2
import sys

def main():
    
    path = '/nvme/ecebes'
    shots = [145387]
    if len(sys.argv) > 1:
        shotnum = int(sys.argv[1])
    if len(sys.argv)>1:
        path = sys.argv[1]
        for s in sys.argv[2:]:
            shots = [int(s) for s in sys.argv[2:]]
    else:
        print('syntax: %s <path> <shotnums> '%sys.argv[0])
    _ = [print('%s\t%d'%(path,s)) for s in shots]

    fname = '%s/%i_dct.h5'%(path,shotnum)
    det = 'ece'
    chstring = '_directional'
    offset = 500
    f = h5py.File(fname,'r')
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('%s/processed/shot%i_ece.avi'%(path,shotnum),fourcc, 4.0, (1024,1024))

    for ch in range(1,41):
        d = f['%s'%det]['%02i%s'%(ch,chstring)][()][:,offset:offset+1024]
        np.sort(d,axis = -1)
        mxout = np.max(d)
        cv2.imwrite('%s/frames/shot%i_ch%02i.png'%(pathshotnum,ch),np.flip(d[:,:,-1]*(2**8)//mxout,axis=0).astype(np.uint8))
        out.write(np.flip(d[:,:,:3]*(2**8)//mxout,axis=0).astype(np.uint8))

    f.close()
    out.release()
    return

if __name__ == '__main__':
    main()

