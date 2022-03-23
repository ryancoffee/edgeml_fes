#import gmpy2
import numpy as np
from utils import testBit,setBit,getSetBits,mod2exp

storebase = int(64)
# testBit() returns a nonzero result, 2**offset, if the bit at 'offset' is one.

def encode(edges,sz):
    #s = gmpy2.xmpz()
    s = int(0)
    overcount = int(0)
    for e in edges:
        if testBit(s,int(e)):
            overcount += 1
        #setBit(s,int(e))
        s |= 1<<int(e) #2**int(e)
    nwords = sz//storebase
    wordlist = []
    for w in range(nwords):
        wordlist += [ np.uint64(mod2exp(s,storebase)) ] ## [s%(2**storebase)]
        #wordlist += [ np.uint64(gmpy2.t_mod_2exp(s,storebase)) ] ## [s%(2**storebase)]
        s >>= storebase ## s /= 2**storebase
    return wordlist,overcount

def decode(s):
    #l = gmpy2.xmpz(0)
    l = int(0)
    for i,v in enumerate(s):
        l |= int(v) << (i*storebase)
        #l |= gmpy2.xmpz(v) << (i*storebase)
        #l += gmpy2.xmpz(v) << (i*storebase)
    return getSetBits(l)  #list(l.iter_set())

def bindist(x,y): ## so far only returns the number of different bits, not related to the earth-movers distance yet
    #X = gmpy2.xmpz(0)
    #Y = gmpy2.xmpz(0)
    X = int(0)
    Y = int(0)
    for i,v in enumerate(x):
        X |= int(v)<<int(storebase*i)
        #X += gmpy2.xmpz(v)<<int(storebase*i)
    for i,v in enumerate(y):
        Y |= int(v)<<int(storebase*i)
        #Y += gmpy2.xmpz(v)<<int(storebase*i)
    d = X^Y
    #d = gmpy2.xmpz(X^Y)
    return bin(d).count("1")
    #return len( list(d.iter_set()) )

