#!/usr/bin/python3

from BESmappings import BESmap

class mappings:
    '''
        Remember, the channels here need to by [1 ... 256) , and 
        let's use 0s as no sensor so that we can easily incorporate sparse coo_matrix later
        Separatrix flag is 1 'inside', 2 'borderline', 3 'outside'
    '''
    def __init__(self,shot = None):
        self.configdict = {}
        self.sepdict = {}
        setshotconfigs()
        setshotsepstate()
        shotmap['s142294'] = ('config0','sepstate0') 
        shotmap['s142300'] = ('config0','sepstate1')
        shotmap['s145384'] = ('config1','sepstate2')
        shotmap['s145747'] = ('config1','sepstate3')
        shotmap['s171472'] = ('config2','sepstate4')
        shotmap['s171473'] = ('config2','sepstate4')
        shotmap['s171477'] = ('config2','setstate5')
        shotmap['s171495'] = ('config2','sepstate5')
        shotmap['s176778'] = ('config3','sepstate6')
        if shot == None:
            return None
        return None

    def setpos(self,chandict,chans,rows,cols):
        for i,c in enumerate(chans):
            chandict[c] = (rows[i],cols[i])
        return self

    def setsep(self,sepdict,chans,flags):
        for i,c in enumerate(chans):
            sepdict[c] = flags[i]
        return self

    def setshotconfigs(self):
        #config0, page 1 & 2, shots 142294, 142300
        configdict['config0'] = {}
        cd = configdict['config0']
        cd[32] = (31,0)
        cd[31] = (31,8)
        chans = [1,5,9,13,25,41,49,57]
        rows = [31]*len(chans)
        cols = [i for i in range(16,24)]
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [30]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [29]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [28]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans[4:]]
        cols = [i for i in range(20,24)]
        rows = [27]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [26]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [25]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [24]*len(chans) 
        setpos(cd,chans,rows,cols)
        cols = [i for i in range(16,20)]
        chans = [17,19,21,23]
        rows = [27]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [c + 1 for c in chans]
        rows = [26]*len(chans) 
        setpos(cd,chans,rows,cols)
        chans = [33,34,35,36,37]
        cols = [i for i in range(16,21)]
        rows = [25]*len(chans)
        setpos(cd,chans,rows,cols)
        chans = [38,39,40]
        rows = [24]*len(chans)
        cols = [i for i in range(18,21)]
        setpos(cd,chans,rows,cols)

        #config1, page 3 & 4, shot 145384, 145747
        configdict['config1'] = {}
        cd = configdict['config1']
        chans = [i for i in range(1,9)]
        cols = [c for c in range(16,24)]
        rows = [34]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(9,17)]
        rows = [33]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(17,25)]
        rows = [32]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(25,33)]
        rows = [31]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(33,41)]
        rows = [30]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(41,49)]
        rows = [29]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(49,57)]
        rows = [28]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(57,65)]
        rows = [31]*len(chans)]
        cols = [c for c in range(8,16)]
        setpos(cd,chans,rows,cols)

        #config2, page 5 & 6 & 7 & 8, shot 171472, 171473, 171477, 171495
        configdict['config2'] = {}
        cd = configdict['config2']
        chans = [i for i in range(17,25)]
        cols = [c for c in range(16,24)]
        rows = [33]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(25,33)]
        rows = [32]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(33,41)]
        rows = [31]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(41,49)]
        rows = [30]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(49,57)]
        rows = [29]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(57,65)]
        rows = [28]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(1,9)]
        rows = [27]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(9,17)]
        rows = [26]*len(chans)]
        setpos(cd,chans,rows,cols)

        #config3, page 9, shot 176778
        configdict['config3'] = {}
        cd = configdict['config3']
        chans = [i for i in range(1,9)]
        cols = [c for c in range(16,24)]
        rows = [35]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(9,17)]
        rows = [34]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(17,25)]
        rows = [33]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(25,33)]
        rows = [32]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(33,41)]
        rows = [31]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(41,49)]
        rows = [30]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(49,57)]
        rows = [29]*len(chans)]
        setpos(cd,chans,rows,cols)
        chans = [i for i in range(57,65)]
        rows = [28]*len(chans)]
        setpos(cd,chans,rows,cols)

        return self

    def setshotsepstate(self):
        '''
        Separatrix flag is 1 'inside', 2 'borderline', 3 'outside'
        '''
        #sepstate0, page 1, shot 142294
        sepdict['sepstate0'] = {}
        sd = sepdict['sepstate0']
        sd[32] = 1
        sd[31] = 1
        chans = [1,5,9,13,25,41,49,57]
        flags = [1]*5 + [2] + [3]*2
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        flags = [1]*5 + [2] + [3]*2
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        flags = [1]*5 + [3]*3
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        flags = [1]*5 + [3]*3
        setsep(sd,chans,flags)
        chans = [17,19,21,23,29,45,53,61]
        flags = [1]*5 + [3]*3
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        flags = [1]*5 + [3]*3
        setsep(sd,chans,flags)
        chans = [33,34,35,36,37,47,55,63]
        flags = [1]*4 + [2] + [3]*3
        setsep(sd,chans,flags)
        chans = [38,39,40,48,56,64]
        flags = [1]*2 + [2] + [3]*3
        setsep(sd,chans,flags)

        #sepstate1, page 2, shot 142300
        sepdict['sepstate1'] = {}
        sd = sepdict['sepstate1']
        sd[32] = 1
        sd[31] = 1
        chans = [1,5,9,13,25,41,49,57]
        flags = [1]*3 + [3]*5
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        setsep(sd,chans,flags)
        chans = [17,19,21,23,29,45,53,61]
        flags = [1]*2 + [2] + [3]*5
        setsep(sd,chans,flags)
        chans = [c + 1 for c in chans]
        setsep(sd,chans,flags)
        chans = [33,34,35,36,37,47,55,63]
        flags = [1]*2 + [3]*6
        setsep(sd,chans,flags)
        chans = [38,39,40,48,56,64]
        flags = [3]*len(chans)
        setsep(sd,chans,flags)

        #sepstate2, page 3, shot 145384
        sepdict['sepstate2'] = {}
        sd = sepdict['sepstate2']
        chans = [i for i in range(1,9)]
        flags = [1]*7 + [3]
        setsep(sd,chans,flags)
        chans = [i for i in range(9,17)]
        setsep(sd,chans,flags)
        chans = [i for i in range(17,25)]
        setsep(sd,chans,flags)
        chans = [i for i in range(25,33)]
        setsep(sd,chans,flags)
        chans = [i for i in range(33,41)]
        setsep(sd,chans,flags)
        chans = [i for i in range(41,49)]
        setsep(sd,chans,flags)
        chans = [i for i in range(49,57)]
        setsep(sd,chans,flags)
        chans = [i for i in range(57,65)]
        flags = [1]*len(chans)
        setsep(sd,chans,flags)

        #sepstate3, pg 4, shot 145747
        sepdict['sepstate3'] = {}
        sd = sepdict['sepstate3']
        chans = [i for i in range(1,9)]
        flags = [1]*4 + [2] + [3]*3
        setsep(sd,chans,flags)
        chans = [i for i in range(9,17)]
        flags = [1]*5 + [3]*3
        setsep(sd,chans,flags)
        chans = [i for i in range(17,25)]
        setsep(sd,chans,flags)
        chans = [i for i in range(25,33)]
        setsep(sd,chans,flags)
        chans = [i for i in range(33,41)]
        setsep(sd,chans,flags)
        chans = [i for i in range(41,49)]
        setsep(sd,chans,flags)
        chans = [i for i in range(49,57)]
        setsep(sd,chans,flags)
        chans = [i for i in range(57,65)]
        flags = [1]*len(chans)
        setsep(sd,chans,flags)

        #sepstate4 pg 5 & 6, shot 171472, 171473
        sepdict['sepstate4'] = {}
        sd = sepdict['sepstate4']
        chans = [i for i in range(17,25)]
        flags = [1]*6 + [2] + [3]
        setsep(sd,chans,flags)
        chans = [i for i in range(25,33)]
        setsep(sd,chans,flags)
        chans = [i for i in range(33,41)]
        setsep(sd,chans,flags)
        chans = [i for i in range(41,49)]
        setsep(sd,chans,flags)
        chans = [i for i in range(49,57)]
        setsep(sd,chans,flags)
        chans = [i for i in range(57,65)]
        setsep(sd,chans,flags)
        flags = [1]*7 + [3]
        chans = [i for i in range(1,9)]
        setsep(sd,chans,flags)
        chans = [i for i in range(9,17)]
        setsep(sd,chans,flags)

        #sepstate5 pg 7 & 8, shot 171477, 171495
        sepdict['sepstate5'] = {}
        sd = sepdict['sepstate5']
        chans = [i for i in range(17,25)]
        flags = [1]*6 + [2] + [3]
        setsep(sd,chans,flags)
        chans = [i for i in range(25,33)]
        setsep(sd,chans,flags)
        chans = [i for i in range(33,41)]
        setsep(sd,chans,flags)
        chans = [i for i in range(41,49)]
        setsep(sd,chans,flags)
        chans = [i for i in range(49,57)]
        setsep(sd,chans,flags)
        flags = [1]*7 + [3]
        chans = [i for i in range(57,65)]
        setsep(sd,chans,flags)
        chans = [i for i in range(1,9)]
        setsep(sd,chans,flags)
        chans = [i for i in range(9,17)]
        setsep(sd,chans,flags)

        #sepstate6 pg 9, shot 176778
        sepdict['sepstate6'] = {}
        sd = sepdict['sepstate6']
        chans = [i for i in range(1,9)]
        flags = [1]*4 + [3]*4
        setsep(sd,chans,flags)
        chans = [i for i in range(9,17)]
        setsep(sd,chans,flags)
        chans = [i for i in range(17,25)]
        setsep(sd,chans,flags)
        chans = [i for i in range(25,33)]
        setsep(sd,chans,flags)
        chans = [i for i in range(33,41)]
        setsep(sd,chans,flags)
        chans = [i for i in range(57,65)]
        setsep(sd,chans,flags)
        flags = [1]*4 + [2] + [3]*3
        chans = [i for i in range(41,49)]
        setsep(sd,chans,flags)
        chans = [i for i in range(49,57)]
        setsep(sd,chans,flags)

        return self


def dealwithBESconfigs(shot = None):
    if shot==None:
        print('give me a shot number string like s123456')
        return BESmap(shape = (64,64))
    
    m = BESmap((64,64))
    m.setshotstring(shot)

    return m
            

