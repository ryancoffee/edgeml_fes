#!/usr/bin/python3

from BESmappings import BESmap

def dealwithBESconfigs(shot = None):
    if shot==None:
        print('give me a shot number string like s123456')
        return BESmap(shape = (64,64))
    
    m = BESmap()
    switch (shot):
        case 's142294':
            m.chanmap[0,31] = 32
            m.chanmap[8,31] = 31
            m.chanmap[16:24,31] = [1,5,9,13,25,41,49,57]
            m.chanmap[16:24,30] = m.chanmap[16:24,31]+1
            m.chanmap[16:24,29] = m.chanmap[16:24,31]+2
            m.chanmap[16:24,28] = m.chanmap[16:24,31]+3
            m.chanmap[20:24,27] = m.chanmap[20:24,31]+4
            m.chanmap[20:24,26] = m.chanmap[20:24,31]+5
            m.chanmap[20:24,25] = m.chanmap[20:24,31]+6
            m.chanmap[20:24,24] = m.chanmap[20:24,31]+7
            m.chanmap[16:20,27] = [17,19,21,23]
            m.chanmap[16:20,26] = [18,20,22,24]
            m.chanmap[16:21,25] = [33,34,35,36,37]
            m.chanmap[16:21,24] = [0,0,38,39,40]

            m.sepflags[0,31] = 32
            m.sepflags[8,31] = 31
            m.sepflags[16:24,31] = [1,5,9,13,25,41,49,57]
            m.sepflags[16:24,30] = m.sepflags[16:24,31]+1
            m.sepflags[16:24,29] = m.sepflags[16:24,31]+2
            m.sepflags[16:24,28] = m.sepflags[16:24,31]+3
            m.sepflags[20:24,27] = m.sepflags[20:24,31]+4
            m.sepflags[20:24,26] = m.sepflags[20:24,31]+5
            m.sepflags[20:24,25] = m.sepflags[20:24,31]+6
            m.sepflags[20:24,24] = m.sepflags[20:24,31]+7
            m.sepflags[16:20,27] = [17,19,21,23]
            m.sepflags[16:20,26] = [18,20,22,24]
            m.sepflags[16:21,25] = [33,34,35,36,37]
            m.sepflags[16:21,24] = [0,0,38,39,40]

    return m
            

