#!/usr/bin/python3

import numpy as np
from scipy.sparse import coo_matrix

'''
    Create a BESmap object.  
    Decide on a few configurations.
    Create a dictionary the links shot number string e.g. 's145745' to the configuration
    In the main code and store as meta maybe in h5 file or companion h5 the configuration mapping and the list of configurations 
'''
class BESmap():
    '''
        Remember, the channels here need to by [1 ... 256) , and 
        let's use 0s as no sensor so that we can easily incorporate sparse coo_matrix later
        Separatrix flag is 1 'inside', 2 'borderline', 3 'outside'
    '''
    def __init__(self,shape=(64,64)):
        self.chanmap = np.full(shape,0,dtype=np.uint8)
        self.sepflags = np.full(shape,0,dtype=np.uint8)
        return None

    def __call__(self):
        newmap = BESmap(self.chanmap.shape)
        newmap.chanmap = self.chanmap.copy()
        newmap.sepflags = self.sepflags.copy()
        return newmap

    def getinds(self):
        return np.where(self.chanmap)

    def getmap(self):
        return self.chanmap

    def getspmap(self):
        r,c = self.getinds()
        return coo_matrix((self.chanmap[r,c],(r,c)),dtype=np.uint8)

    def getsep(self):
        return self.sepflags

    def getspsep(self):
        r,c = self.getinds()
        return coo_matrix((self.sepflags[r,c],(r,c)),dtype=np.uint8)

    def setinds(self,r,c,v):
        self.chanmap[r,c] = v
        return self

    def setsepflag(self,r,c,v):
        self.sepflags[r,c] = v
        return self
        
    def print(self):
        print('chanmap',self.chanmap)
        print('separatrix',self.sepflags)
        return None



