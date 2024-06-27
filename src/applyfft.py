import h5py
import numpy as np
import ParaClass
import os
import matplotlib.pyplot as plt
import re

def main(fpath, save_path):
    all_files = os.listdir(fpath)
    all_files = list(filter(lambda x: "shot" in x, all_files))
    for file in all_files:
        try:
            print(file)
            shot_no = re.search(r'\d+', file).group()
            with h5py.File(fpath+file, "r") as f:
                p = ParaClass.Params(fpath,save_path+"fft_"+file, shot_no)
                p.initTimesChans(f)
                p.fillData(f)
                p.setMethod()
                with h5py.File(save_path+"fft_"+file, "w") as f1:
                    p.initH5(f1)
                    p.processFFT(f1)
        except:
            continue





if __name__ in "__main__":
    main(fpath = "/sdf/slac/mfe/shot_data/", save_path = "/sdf/data/slac/mfe/fft_data_reorg/")