import gmpy2
import numpy as np

storebase = int(64)

def encode(edges,sz):
    s = gmpy2.xmpz()
    for e in edges:
        s += 1<<int(e) #2**int(e)
    nwords = sz//storebase
    wordlist = []
    for w in range(nwords):
        wordlist += [ np.uint64(gmpy2.t_mod_2exp(s,storebase)) ] ## [s%(2**storebase)]
        s = s >> storebase ## s /= 2**storebase
    return wordlist

def decode(s):
    l = gmpy2.xmpz()
    for i,v in enumerate(s):
        l += gmpy2.xmpz(v) << (i*storebase)
    return list(l.iter_set())

def bindist(x,y): ## so far only returns the number of different bits, not related to the earth-movers distance yet
    X = gmpy2.xmpz(0)
    Y = gmpy2.xmpz(0)
    for i,v in enumerate(x):
        X += gmpy2.xmpz(v)<<int(storebase*i)
    for i,v in enumerate(y):
        Y += gmpy2.xmpz(v)<<int(storebase*i)
    d = gmpy2.xmpz(X^Y)
    return len( list(d.iter_set()) )

