#!/usr/bin/python3

import numpy as np
from h5utils import *
import cv2
import sys

def main():
    
    path = '/nvme/ecebes'
    shots = [145387]
    if len(sys.argv)>1:
        path = sys.argv[1]
        shots = [int(s) for s in sys.argv[2:]]
    else:
        print('syntax: %s <path> <shotnums> '%sys.argv[0])
    _ = [print('%s\t%d'%(path,s)) for s in shots]

    for shot in shots:
        fname = '%s/%i_dct.h5'%(path,shot)
        f = h5py.File(fname,'r')
        det = 'ece'
        chstring = '_directional'
        offset = 500
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter('%s/ece_shot%i.avi'%(path,shot),fourcc, 4.0, (1024,512))

        for ch in range(1,41):
            d = f['%s'%det]['%02i%s'%(ch,chstring)][()][:512,offset:offset+1024]
            d = np.sort(d,axis = -1)
            c=np.zeros((d.shape[0],d.shape[1],3))
            c[:,:,0] = d[:,:,-1]
            c[:,:,1] = d[:,:,0]
            c[:,:,2] = d[:,:,-1]
            mxout = np.max(c[:,:,0])
            mnout = np.min(c[:,:,-1])
            #cv2.imwrite('%s/frames/ece_shot%i_ch%02i.png'%(path,shot,ch),np.flip(d[:,:,-1]*(2**8)//mxout,axis=0).astype(np.uint8))
            tmp = np.flip((c[:,:,-3:]-mnout)*(2**9)//(mxout-mnout),axis=0)
            inds = np.where(tmp>255)
            tmp[inds]=255
            out.write(tmp.astype(np.uint8))
            #out.write(np.flip(d[:,:,:3]*(2**8)//mxout,axis=0).astype(np.uint8))
        out.release()

        det = 'bes'
        chstring = '_directional'
        offset = 500
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter('%s/bes_shot%i.avi'%(path,shot),fourcc, 4.0, (1024,256))

        for ch in range(1,65):
            d = f['%s'%det]['%02i%s'%(ch,chstring)][()][:256,offset:offset+1024]
            d = np.sort(d,axis = -1)
            c=np.zeros((d.shape[0],d.shape[1],3))
            c[:,:,0] = d[:,:,-1]
            c[:,:,1] = d[:,:,0]
            c[:,:,2] = d[:,:,-1]
            mxout = np.max(c[:,:,0])
            mnout = np.min(c[:,:,1])
            #cv2.imwrite('%s/frames/bes_shot%i_ch%02i.png'%(path,shot,ch),np.flip(d[:,:,-1]*(2**8)//mxout,axis=0).astype(np.uint8))
            tmp = np.flip((c[:,:,:3]-mnout)*(2**9)//(mxout-mnout),axis=0)
            inds = np.where(tmp>255)
            tmp[inds]=255
            out.write(tmp.astype(np.uint8))
            #out.write(np.flip((c[:,:,:3]-mnout)*(2**8)//(mxout-mnout),axis=0).astype(np.uint8))
        out.release()

        f.close()

    return

if __name__ == '__main__':
    main()

