import h5py
import numpy as np
import ParaClass
import os
import matplotlib.pyplot as plt
import re

def main(fpath, save_path):
    all_files = os.listdir(fpath)
    all_files = list(filter(lambda x: "shot" in x, all_files))
    for file in all_files[:7]:
        print(file)
        shot_no = re.search(r'\d+', file).group()
        with h5py.File(fpath+file, "r") as f:
        # with h5py.File(fpath+file, "r") as f:
            # print(f["ece"].keys())
            # print(len(f["ece"]["ECEVS01"][()]))
            # plt.plot(f["ece"]["ECEVS01"][()])
            # plt.show()
            # return
            p = ParaClass.Params(fpath,save_path+"fft_"+file, shot_no)
            p.initTimesChans(f)
            p.fillData(f)
            # print("data: ", p.data)
            p.setMethod()
            with h5py.File(save_path+"fft_"+file, "w") as f1:
                p.initH5(f1)
                print("about to process fft")
                p.processFFT(f1)





if __name__ in "__main__":
    main(fpath = "/sdf/scratch/coffee/edgeml_fes_data/", save_path = "/sdf/scratch/users/b/bmencer/fes_data/")