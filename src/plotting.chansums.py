#!/sdf/sw/images/slac-ml/20211027.1/bin/python3
#!/bin/python3

import matplotlib.pyplot as plt
import numpy as np
import h5py
import sys
import re
from utils import selectchanwin,sumchans,selectchan

def main(fname):
    with h5py.File(fname,'r') as f:
        step = 4 
        tempkeys = [k for k in list(f.keys()) if not re.search('qbins',k)]
        shots = []
        shotkeys = []
        qbinskeys = []
        for k in tempkeys:
            m = re.search('shot_(\d+)',k)
            shots += [int(m.group(1))]
            shotkeys += [k]
            qbinskeys += ['%s_qbins'%k]
        print(shots)
        for s in range(10):
            data = f[shotkeys[s]][()]
            print('working shot %i'%shots[s])
            for c1 in range(0,data.shape[0]-step,step):
                oname = '../figures/shot_%i_cwin%02i.png'%(shots[s],c1)
                plt.pcolor(selectchanwin(data,c1,c1+step));
                plt.clim(0,int(0.75*step));
                plt.xlabel('time [ms]')
                plt.ylabel('quant. freqs.')
                plt.savefig(oname)


if __name__ == '__main__':
    if len(sys.argv)>1:
        main(sys.argv[1])
