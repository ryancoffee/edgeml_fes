#!/usr/bin/python3

import sys
import math
import numpy as np

fbits=3

def getbin(ys):
    bits = int(1<<fbits)
    onvec=np.zeros(1<<fbits)
    dx = ys[0]/sum(ys)*(1<<fbits)
    onvec[np.arange(int(dx))] = 1
    return onvec
'''
    if ys[0]==ys[1]:
        onvec[bits//2] = 1
    if ys[0]>7*ys[1]:
        onvec[1] = 1
    if ys[1]>7*ys[0]:
        onvec[7] = 1
    if ys[1]>2*ys[0]:
        onvec[np.arange(int(1*(1<<fbits)//3))] = 1
    if ys[0]>2*ys[1]:
        onvec[np.arange(int(2*(1<<fbits)//3))] = 1
    if ys[1]>3*ys[0]:
        onvec[np.arange(int(1*(1<<fbits)//4))] = 1
    if ys[0]>2*ys[1]:
        onvec[np.arange(int(3*(1<<fbits)//4))] = 1
    return onvec
'''

'''
    i=0
    j=1
    direction = 1
    if ys[1]>ys[0]:
        i=1
        j=0
        direction = -1
    a = ys[i]
    b = ys[j]
    if a>b and a<(b<<1):
        return direction * 0.5
    if a>(b<<1) and a<(b<<2):
        return direction * 0.25
    return direction
'''

def main():
    print('Give me the two integer y values, first negative, second positive')
    ys = [ abs(int(v)) for v in sys.argv[1:3] ]
    ## y = sum(ys)/(step==(1<<fbits))*dx - ys[0] = 0
    ## ys[0]/sum(ys)*(1<<fbits) = dx
    dx = ys[0]/sum(ys)*(1<<fbits)
    print('deltaX bin %.2f'%(dx))
    x = np.arange(int(1)<<fbits)
    y = (ys[1]+ys[0])/(int(1)<<fbits)*x -ys[0]
    np.savetxt('tmp.crossing.dat',np.stack((x,y,getbin(ys)),axis=1),fmt='%.2f')
    print()
    return


if __name__ == '__main__':
    main()
