import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
import re
import numpy as np
import utils
import gc
import os
from scipy.fft import rfft,irfft
import matplotlib.pyplot as plt
import h5py
import math

# def find_det_key(keys, detector):
#     for i in keys:
#         if len(str(detector)) == 1:
#             detector = "0" + str(detector) # single digit detector number become 01, 02, etc.
#         # print("detector: ", detector, " key: ", i, " ", str(detector) == i[-len(str(detector)):])
#         if str(detector) == i[-len(str(detector)):]: #if end of key is detector number
#             detector_key = i
    
#     return detector_key


# Generate sample data for imshow
def generate_data(filename):
    nsamples = 512 #useful for reshaping

    
    with h5py.File("/sdf/scratch/coffee/edgeml_fes_data/"+filename, "r") as f:
        keys = list(f['ece'].keys())[:-1]
        no_detectors = len(list(keys))
        cov_matrix = np.zeros((no_detectors, no_detectors))
        for i, i_key in enumerate(keys):
            for j, j_key in enumerate(keys):
                cov_matrix[i][j] = np.cov(f["ece"][i_key][()], f["ece"][j_key][()], ddof=0)[0, 1]
            print("i: ", i)
        

        
        
    return cov_matrix

# Function to update the plot
def update_plot(*args):
    filename = filename_var.get()
    
    print(f"Filename: {filename}")

    cov_matrix = generate_data(str(filename))
    
    
    ax1.clear()
    im1 = ax1.imshow(cov_matrix)
    ax1.set_title("covariance for detectors in file "+filename)   
    
    
    
    
    

    canvas.draw()
    
    print("End of update")
    print("------------------------------------")

    
    

# Initialize main window
root = tk.Tk()
root.title("Interactive Dashboard with Tkinter and Matplotlib")
frame = ttk.Frame(root)
frame.pack(side=tk.TOP, fill=tk.X, pady=10)

frame_b = ttk.Frame(root)
frame_b.pack(side=tk.BOTTOM, fill=tk.X, pady=10)

# frame_r = ttk.Frame(root)
# frame_r.pack(side=tk.RIGHT, fill=tk.X, pady=10)

# Create a figure and axis for the plot
fig, (ax1) = plt.subplots(1, 1, figsize=(15, 5), gridspec_kw={'width_ratios': [1]})
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)


files = os.listdir("/sdf/scratch/coffee/edgeml_fes_data/")
# filename selector
filename_var = tk.StringVar(value="shot_163500.h5")
filename_label = ttk.Label(frame_b, text="Enter Detector Number:")
filename_label.pack(side=tk.LEFT, padx=10)
filename_menu = ttk.Combobox(frame_b, textvariable=filename_var)
filename_menu['values'] = files
filename_menu.pack(side=tk.LEFT, padx=10)
filename_menu.bind('<<ComboboxSelected>>', update_plot)





# Initial plot
update_plot()

# Start the Tkinter event loop
root.mainloop()
