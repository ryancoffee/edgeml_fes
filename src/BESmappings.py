#!/usr/bin/python3

import numpy as np

'''
    Create a BESmap object.  
    Decide on a few configurations.
    Create a dictionary the links shot number string e.g. 's145745' to the configuration
    In the main code and store as meta maybe in h5 file or companion h5 the configuration mapping and the list of configurations 
'''
class BESmap:
    def __init__(self):
        self.chanmap = np.full((64,64),np.uint8(255),dtype=np.uint8)

    def getinds(self):
        return np.where(self.chanmap < 255)

    def getmap(self):
        #        return a sparse_coo matrix with the inds and the values from np.c_[ getinds[0],getinds[1],chanmap[getinds] ]
        rows,cols = self.getinds()
        return np.c_[rows,cols,self.chanmap[rows,cols]]

    def setinds(self,r,c,v):
        self.chanmap[r,c] = v


