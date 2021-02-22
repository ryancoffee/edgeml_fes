#!/usr/bin/python3
import numpy as np
import h5py
import sys
import cv2

def parallelcoordlist(d,irange,jrange):
    out = []
    for i in irange:
        for j in jrange:
            out += [d[i,j,:]]
    return out

def parallelcoordhist(vlist):
    stretch = 256
    h = np.ones((512,len(vlist[0])*stretch),dtype=np.uint64)
    for v in vlist:
        for i in range(len(v)):
            x0=stretch*i
            y0 = v[i]*2
            x1=stretch*((i+1))
            y1 = v[(i+1)%len(v)]*2
            m = float(y1-y0)/float(x1-x0)
            for j in range(x0,x1):
                y = float(j-x0)*m + float(y0)
                h[int(y),int(j)] += 1
    return np.log2(h)

def main():
    if len(sys.argv)<2:
        print('syntax:\t%s <h5 filename>'%sys.argv[0])
        return
    r1,r2 = (0,128)
    c1,c2 = (800,1056)
    with h5py.File(sys.argv[1]) as f:
        d = f['ece']['20_filtlog'][()]
        img = np.zeros((d.shape[0],d.shape[1],3),dtype=np.uint8)
        #img[:,:,0] = np.max(d,axis=2).astype(np.uint8)
        img[:,:,0] = d[:,:,0].astype(np.uint8)
        img[:,:,1] = d[:,:,1].astype(np.uint8)
        img[:,:,2] = d[:,:,3].astype(np.uint8)
        cv2.imwrite('./testPlot.20_filtlog.png',np.flipud(img[r1:r2,c1:c2,:]))
        cv2.imshow('test plot',img[r1:r2,c1:c2,:])
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        pclist = parallelcoordlist(d,range(r1,r2),range(c1,c2))
        pchist = parallelcoordhist(pclist)
        print(np.max(pchist))
        img = np.flipud((255-pchist*255/np.max(pchist)).astype(np.uint8))
        cv2.imwrite('./testPara.20_filtlog.png',img)
        cv2.imshow('test plot',img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()


    return

if __name__ == '__main__':
    main()
