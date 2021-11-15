# edgeml_fes
EdgeML for Fusion Energy Science project

## DOE Program Support
Thie project is funded by the US Department of Energy, Office of Science, Fusion Energy Science under Field Work Proposal Grant number ...

# Running on SLAC SDF  
First obtain an account and log into the SLAC SDF cluster login node via ```ssh```.  
Make sure you have access to the saved pickel file for the ece and bes sampe shots in ```/gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/```

```bash
ssh <uname>@sdf.slac.stanford.edu
git clone https://github.com/ryancoffee/edgeml_fes.git
cd edgeml_fes
git checkout sdf
srun --partition ml -n 1 --mem-per-cpu=200000 --pty /bin/bash
ls /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes/
./src/explore_ecebes_dct.py /gpfs/slac/staas/fs1/g/coffee_group/edgeml_fes_data/ecebes 122117 145387 174082 174084 174819 174823
```
