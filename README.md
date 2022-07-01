# edgeml\_fes
EdgeML for Fusion Energy

## Working notes
Using sdf branch for updating `/src/run_parallel_ecebes.py`  
Converting the scipy.fftpack.dct to the matrix version to check for performance improvement and also to use lower bit depth.  *Still in progress*
Times I will convert to np.uint32 represented in microseconds. Later this will become 1/4 microseconds to accommodate eventual higher sample rate ADCs.  

On ece locations, including this now(soon) in the .h5 conversion of pickle files:   
From Joe Abbate  
Joe: hey ryan sorry again for missing your email!
ryan: "Let me guess... you use the magnetics from slow sensors to reconstruct the location from which the cyclotron frequency was emitted corresponding to that ece channel. Since it's a slow variable, you only measure every 50 ms or so. The vector of values and times shows the location drift of the channel throughout the shot. Is that right? We would interpolate in order to assign the spectrogram patches that Alan is working with to a fixed location in the lab frame."
Joe: that's exactly right yup!  

On second thought, disenabling locations again for sake of the Finn datasets that don't include this derived quantity.  

## DOE Program Support
This project is funded by the US Department of Energy, Office of Science, Fusion Energy Science under Field Work Proposal FWP-100636 *Machine Learning for Real-time Fusion Plasma Behavior Prediction and Manipulation*

# Running on SLAC SDF  
First obtain an account and log into the SLAC SDF cluster login node via ```ssh```.  Make sure you have access to the saved pickel file for the ece and bes sampe shots in ```/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/```.  Please check out the docs for slurm on SLAC SDF at ```https://github.com/slaclab/sdf-docs/blob/master/batch-compute.md#interactive```.
There is a new landing site for the data being pulled by Finn O'Shea, ```/sdf/group/ml/datasets/d3d_data/ecebes_[176]*.h5```.  There are many more shots from ecebes_156562.h5 to ecebes_177022.h5.  The easiest way to find them is to vim the parent folder name ```vim /sdf/group/ml/datasets/d3d_data``` and look.

There are currently nearly 1000 files there with a total of about 3/4 TB and it is still growing as the shots are pulled from DIII-D server.  *Thank you Finn!*  
To use this dataset, I will need to refactor the spectrogram code to read in .h5 files rather than the previous pickle implementation.  I will preserve this pickle version as an alpha-release.

```bash
ssh <uname>@sdf.slac.stanford.edu
git clone https://github.com/ryancoffee/edgeml_fes.git
cd edgeml_fes
git checkout sdf
srun --x11 --partition ml -n 4 --time 0-03:00:00 --mem-per-cpu=200000 --pty /bin/bash
module load slac-ml
ls /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/d3d_output/
ls /sdf/group/ml/datasets/d3d_data/
python3 ./src/run_parallel_ecebes.py -ipath /sdf/group/ml/datasets/d3d_data -opath /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/d3d_ouptut/h5files -nthreads 2 -nsamples_bes 1024 -nsamples_ece 512 -shots 157817 157818 157819 157820
```
... or to run the paramllel version  
```bash
python3 ./src/parallel_ecebes_dct.py -ipath /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes -opath /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/h5files_para -nthreads 4 150616 150792 157102 163117
```

The above code is intended to be a snippet of a possible execution.  It presupposes that the files exist and the paths have not changed.  One must check wiht the ```ls /gpfs...``` that the pickle files exist as expected and the shot numbers are there.  Furthermore, upon successful completion, the resulting ```/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/h5files/collection_dct.h5``` should be moved to another name.  This is because the file is appended when being produced, and so fails if trying to create a group (e.g. shotnumber) that already exists.    

*NOTE: Each shot adds about 6GB to the collection_dct.h5 file*  

# python/gnuplot   
Be sure to enable x11 forwarding with -X or -Y options to ssh.  This passes through to the slurm container by the --x11 option.  

```bash
ssh -Y <uname>@sdf.slac.stanford.edu
srun --x11 --partition ml -n 1 --time 0-03:00:00 --mem-per-cpu=200000 --pty /bin/bash
module load slac-ml
```
and to include only or exclude a node that e.g. has misbehaving x11 forwarding...   
```bash
srun --x11 --nodelist tur015 --partition ml -n 1 --time 0-03:00:00 --pty /bin/bash
srun --x11 --exclude tur015 --partition ml -n 1 --time 0-03:00:00 --pty /bin/bash
```

# Notes to self  
Moving to src/run_parallel_ecebes.py

11/17/2021
* group by detector, then by channel, then by 'method'
* restrict method to 'directional' and 'max'
* use mean and stdev for the highest 10% of frequencies to set the scale of a sigmoid multiplier (maybe) or at least a mean subtract and a threshold
* paly the trick of multiplying peaks by their derivatives and look for zero crossing.
* centroid and width of a peak could serve as a 2D embedding for each peak (word)

