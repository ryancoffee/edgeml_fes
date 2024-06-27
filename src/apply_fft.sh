#!/bin/bash
#SBATCH --partition=ampere
#SBATCH --job-name=mfe_fft
#SBATCH --output=output-%j.txt
#SBATCH --error=output-%j.txt
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=20g
#SBATCH --time=0-10:00:00

export SLURM_EXACT=1
echo starting run 1 at: `date`


python3 /sdf/home/b/bmencer/edgeml_fes/src/applyfft.py
# Print the date again -- when finished
echo Finished at: `date`


#'batch_size': 32, 'hidden_size': 128, 'dropout_p': 0.2, 'num_lstm_layers': 2, 'lstm_dropout': 0.2, 'weight_decay': 0.0, 'bidirectional': True, 'fc_layers_index': 4, 'cnn_type': False, 'lr_reduction_factor': 0.5


