#!/usr/bin/python3

import sys

fbits=2

def main():
    print('Give me the two integer y values, first negative, second positive')
    ys = [ abs(int(v))<<fbits for v in sys.argv[1:3] ]
    print(ys)
    if ys[0]>ys[1]:
        while ys[1]>(2**fbits):#<<fbits):
            ys[0] = ys[0]>>1
            ys[1] = ys[1]>>1
            print(ys)
        s = sum(ys)
        while s > 2**fbits:
            ys[0] = ys[0]>>1
            s = s>>1
        print('y0 / s = %i / %i'%(ys[0],s))
    else:
        print(ys)
    return

if __name__ == '__main__':
    main()
