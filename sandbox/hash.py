#!/usr/bin/python3

import numpy as np
import sys

M = int(10)
d = 3 
np.random.seed(0)
a = np.random.uniform(0,M,10).astype(int)
C=16
l = 10

def initLSHtables(P,l):
    seq = [i for i in range(P.shape[1]*C)]
    np.random.seed(100)
    I = [np.random.choice(seq,5) for i in range(l)]
    return I

def unaryC(x):
    i = int(x)
    return [int(1)]*i + [int(0)]*(C-i)


    return y
def stdhash(x):
    y = np.dot(a,x)
    return y%M

def main():
    print(unaryC(10.5))
    x = np.random.uniform(0,2,10).astype(int)
    if len(sys.argv) > 10:
        x = np.array(sys.argv[1:11]).astype(int)

    print(a,'\t',stdhash(x))

    print('moving onto Hamming cube embedding')
    X=[]
    for i in range(20):
        pos = np.arange(1,4)
        if i>10:
            pos[0] += 5
        pos += np.random.normal(0,5,(3,)).astype(int)
        x = [p*(p>=0) for p in pos]
        X += [x]
        #x += [unaryC(p) for p in range(pos[-1].shape[0])]
    print(X)
    Ilist = initLSHtables(np.c_[X],5)
    print(Ilist)
    
    return

if __name__ == '__main__':
    main()
