#!/sdf/sw/images/slac-ml/20211027.1/bin/python3
#!/bin/python3

import matplotlib.pyplot as plt
import numpy as np
import h5py
import sys
import re
from utils import selecttimewin

def main(fname):
    with h5py.File(fname,'r') as f:
        step = 50
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
            for t1 in range(0,data.shape[-1]-step,step):
                oname = '../figures/shot_%i_twin%04i.png'%(shots[s],t1)
                plt.pcolor(selecttimewin(data,t1,t1+step).T);
                plt.clim(0,int(0.75*step));
                plt.xlabel('channels')
                plt.ylabel('quant. freqs.')
                plt.savefig(oname)


if __name__ == '__main__':
    if len(sys.argv)>1:
        main(sys.argv[1])
