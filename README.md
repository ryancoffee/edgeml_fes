# edgeml\_fes
EdgeML for Fusion Energy

## DOE Program Support
This project is funded by the US Department of Energy, Office of Science, Fusion Energy Science under Field Work Proposal FWP-100636 *Machine Learning for Real-time Fusion Plasma Behavior Prediction and Manipulation*

# Running on SLAC SDF  
First obtain an account and log into the SLAC SDF cluster login node via ```ssh```.  Make sure you have access to the saved pickel file for the ece and bes sampe shots in ```/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/```.  Please check out the docs for slurm on SLAC SDF at ```https://github.com/slaclab/sdf-docs/blob/master/batch-compute.md#interactive```.

```bash
ssh <uname>@sdf.slac.stanford.edu
git clone https://github.com/ryancoffee/edgeml_fes.git
cd edgeml_fes
git checkout sdf
srun --x11 --partition ml -n 4 --time 0-03:00:00 --mem-per-cpu=200000 --pty /bin/bash
module load slac-ml
ls /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/
python3 ./src/explore_ecebes_dct.py /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes 122117 145387 174082 174084 174819 174823
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

