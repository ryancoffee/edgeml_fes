# edgeml_fes
EdgeML for Fusion Energy

## DOE Program Support
This project is funded by the US Department of Energy, Office of Science, Fusion Energy Science under Field Work Proposal FWP-100636 *Machine Learning for Real-time Fusion Plasma Behavior Prediction and Manipulation*

# Running on SLAC SDF  
First obtain an account and log into the SLAC SDF cluster login node via ```ssh```.  Make sure you have access to the saved pickel file for the ece and bes sampe shots in ```/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/```

```bash
ssh <uname>@sdf.slac.stanford.edu
git clone https://github.com/ryancoffee/edgeml_fes.git
cd edgeml_fes
git checkout sdf
srun --partition ml -n 1 --mem-per-cpu=200000 --pty /bin/bash
ls /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/
./src/explore_ecebes_dct.py /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes 122117 145387 174082 174084 174819 174823
```

The above code is intended to be a snippet of a possible execution.  It presupposes that the files exist and the paths have not changed.  One must check wiht the ```ls /gpfs...``` that the pickle files exist as expected and the shot numbers are there.  Furthermore, upon successful completion, the resulting ```/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/h5files/collection_dct.h5``` should be moved to another name.  This is because the file is appended when being produced, and so fails if trying to create a group (e.g. shotnumber) that already exists.    

*NOTE: Each shot adds about 6GB to the collection_dct.h5 file*    
