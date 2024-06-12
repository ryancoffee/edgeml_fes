# edgeml\_fes
EdgeML for Fusion Energy Science project  

## DOE-FES Support
This work was supported by the Department of Energy, Office of Fusion Energy Science under Field Work Proposal 100636 "Machine Learning for Real-time Fusion Plasma Behavior Prediction and Manipulation."   
This material is based upon work supported by the U.S. Department of Energy, Office of Science, Office of Fusion Energy Sciences, using the DIII-D National Fusion Facility, a DOE Office of Science user facility, under Award DE-FC02-04ER54698.  

# Super-resolution  
Connect with Raffi Nazikian with the Thomas Feurer paper on time-domain ptychography.  
Also run a test of using random incommensurate sampling in time to recover higher frequency information from across channels of diagnostics.  How low of sampling can we do if we do stochastic distribution of sample times?   

# Example filenames in sdf filesystem accessed via s3df  
Each file is aobut 80% of a GB.  Counting 158-187k of them at 1GB each would gives a max of 29 thousand of 1GB files would be 29 TB.  
I believe there is heavy duplication in the "time" variable that I will check for future reference.  
times are stored it seems as maybe 'f4', but I'm not sure this is a float4... 
The minimum step size is just under .001 ms as stored and the values run from 0 to 5000 or so, so we can expand by 1000 to microseconds and use something bigger than 24 bits, so let's use 32 bits integer and multipy up by 1000 for the microsecond counts.  
```
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_158000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_159006.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_160013.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_161026.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_165012.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_166002.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_169000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_170000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_175002.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_176000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_177000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_179009.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_184001.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_185000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_186000.h5
/fs/ddn/sdf/group/ml/datasets/elm_data/elm_data_187014.h5
```

When analysis is done, move files over to e.g. `/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/d3d_output/h5files/` using s3dfdtn data transfer node.   
The newwest data from d3d is actually being saved by Finn into `/sdf/group/ml/datasets/elm_data/`
 
# Specifying shots to run
Be careful.  It is easy to get a very long sequence to overfill a nodes cores...   

```bash
shots=$(seq 170800 170824)
shots=`echo $shots $(seq 170864 170897)`
IPATH='/sdf/group/ml/datasets/elm_data/'
OPATH='/scratch/coffee/edgeml_fes_data'
mkdir -p $OPATH
./src/run_parallel_ecebes.py -ipath $IPATH -opath $OPATH -nthreads 16 -nsamples_bes 1024 -nsamples_ece 512 -shots $shots
```   
Keep in mind, when we are qunantizing later, we will use no more than 256 bins for the non-uniform quantization.  
The nsamples are chosen in order to give a 1ms time window per spectrogram.

#File location 
Finn has placed files into the Ml group space  

```bash
/sdf/group/ml/datasets
" ============================================================================                                                                                                                                     
" Netrw Directory Listing                                        (netrw v149)
"   /sdf/group/ml/datasets/d3d_data
"   Sorted by      name
"   Sort sequence: [\/]$,\<core\%(\.\d\+\)\=\>,\.h$,\.c$,\.cpp$,\~\=\*$,*,\.o$,\.obj$,\.info$,\.swp$,\.bak$,\~$
"   Quick Help: <F1>:help  -:go up dir  D:delete  R:rename  s:sort-by  x:exec
" ============================================================================
../
./
ecebes_156562.h5
ecebes_156563.h5
ecebes_156564.h5
ecebes_156565.h5
ecebes_156637.h5
ecebes_156638.h5
ecebes_156639.h5


ecebes_176947.h5
ecebes_176963.h5
ecebes_176970.h5
ecebes_176972.h5
ecebes_176977.h5
ecebes_176979.h5
ecebes_176986.h5
ecebes_176988.h5
ecebes_176995.h5
ecebes_176997.h5
ecebes_177002.h5
ecebes_177004.h5
ecebes_177011.h5
ecebes_177013.h5
ecebes_177020.h5
ecebes_177022.h5         
```
There are over 6000 files, each file is a shot.  Each shot has both ece and bes data (coarse and fine).
The keys of these files are ```['BESFU', 'BESSU', 'ece', 'ecevs']```  of which we want the BESFU and ecevs


## Working notes
Using sdf branch for updating ```/src/run_parallel_ecebes.py```
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

