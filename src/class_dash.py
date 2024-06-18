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

def stabilize(original, stab_hist):
    clean = np.copy(original)
    epsilon = math.floor(math.log10(max(original)))-1
    print("eps: ", epsilon, " min: ", min(original))
    for i in range(stab_hist, len(clean)):
    # Check if the previous 10 elements are all greater than 0
        if any(np.abs(original[i-stab_hist:i]) < 10**epsilon):
            clean[i] = 0
        else:
            clean[i-stab_hist:i] = original[i-stab_hist:i]
    print(original == clean)
    return clean

# Generate sample data for imshow
def generate_data(filename, detector, minimum_peak_height, fft_vmax, slope_dist, stab_hist):
    nsamples = 512
    with h5py.File("/sdf/scratch/coffee/edgeml_fes_data/"+filename, "r") as f:
        for i in f['ece'].keys():
            #print(str(detector), i[-len(str(detector)):])
            if str(detector) == i[-len(str(detector)):]: #if end of key is detector number
                detector_key = i
                #print(detector_key)
        raw = f["ece"][detector_key][()]*(1<<10) #raw data

        raw_reshape = raw.reshape(-1,nsamples).T #reshape to be ? x 512

        fft = rfft(np.concatenate((raw_reshape,np.flip(raw_reshape,axis=0)),axis=0),axis=0,norm='backward') #apply fft
        fft[:5, :] = 0 #first 5 rows to 0
        inds = np.where(np.sign(fft) == -1) #make sure there are no negatives
        fft[inds] = 0
        fft = np.abs(fft.real)
        
        power_spec_classifier = np.zeros(len(fft.T))
        
        for col_count, col in enumerate(fft.T):
            cleaned_col = np.copy(col)
            cleaned_col[cleaned_col < minimum_peak_height] = 0 #set peaks in raw data below a certain height to 0
            
            spec_2 = rfft(cleaned_col)
            spec_abs = np.power(np.abs(spec_2), int(2))
            instant_slope = spec_abs[0] - np.average(spec_abs[slope_dist: slope_dist + (slope_dist//10)]) # find difference between index 0 and index 50 of power spectrum of second fft
            power_spec_classifier[col_count] = instant_slope
            
        cleaned_power_spec_classifier = stabilize(power_spec_classifier, stab_hist)
            
        
        
    return raw, fft, cleaned_power_spec_classifier

# Function to update the plot
def update_plot(*args):
    filename = str(filename_entry.get())
    try:
        filename = float(filename)
    except ValueError:
        filename = "shot_163500.h5"
        
    detector = detector_var.get()
    try:
        detector = float(detector)
    except ValueError:
        detector = 1
        
    minimum_height = min_height_entry.get()
    try:
        minimum_height = float(minimum_height)
    except ValueError:
        minimum_height = 0
        
    fft_vmax = fft_vmax_entry.get()
    try:
        fft_vmax = float(fft_vmax)
    except ValueError:
        fft_vmax = 1<<32
        
    slope_dist = slope_dist_entry.get()
    try:
        slope_dist = float(slope_dist)
    except ValueError:
        slope_dist = 50
    
    stab_hist = stab_hist_entry.get()
    try:
        stab_hist = float(stab_hist)
    except ValueError:
        stab_hist = 1
    
    print("Filename:", filename)
    print("Detector:", detector)
    print("Minimum Height:", minimum_height)
    print("FFT Vmax:", fft_vmax)
    print("Slope Distance:", slope_dist)
    print("Stabilization History:", stab_hist)
    raw, fft, classified = generate_data(str(filename), int(detector), int(minimum_height), int(fft_vmax), int(slope_dist), int(stab_hist))
    
    ax1.clear()
    im1 = ax1.plot(raw)
    ax1.set_title("raw data for detector "+str(detector))
    

    ax2.clear()
    im2 = ax2.imshow(fft, vmax=int(fft_vmax))  # Example: Using different colormap
    ax2.invert_yaxis()
    ax2.set_title("fft for detector "+str(detector))
    
    ax3.clear()
    im3 = ax3.plot(classified)  # Example: Using different colormap
    ax3.set_title("classifier for detector "+str(detector))
    
    
    
    
    
    

    canvas.draw()
    
    print("End of update")
    print("------------------------------------")

    
    

# Initialize main window
root = tk.Tk()
root.title("Interactive Dashboard with Tkinter and Matplotlib")


# Create a figure and axis for the plot
fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(15, 5), gridspec_kw={'width_ratios': [1, 3, 1]})
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)


# filename
filename_label = ttk.Label(root, text="filename:")
filename_label.pack(side=tk.LEFT, padx=10)
filename_entry = ttk.Entry(root)
filename_entry.pack(side=tk.LEFT, padx=10)
filename_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter


# detector
detector_var = tk.IntVar(value=1)
detector_label = ttk.Label(root, text="Enter Detector Number:")
detector_label.pack(side=tk.LEFT, padx=10)
detector_menu = ttk.Combobox(root, textvariable=detector_var)
detector_menu['values'] = list(range(1, 49))
detector_menu.pack(side=tk.LEFT, padx=10)
detector_menu.bind('<<ComboboxSelected>>', update_plot)

# min peak height
min_height_label = ttk.Label(root, text="Enter Minimum Peak Height (before fft):")
min_height_label.pack(side=tk.LEFT, padx=10)
min_height_entry = ttk.Entry(root)
min_height_entry.pack(side=tk.LEFT, padx=10)
min_height_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# fft vmax
fft_vmax_label = ttk.Label(root, text="fft vmax:")
fft_vmax_label.pack(side=tk.LEFT, padx=10)
fft_vmax_entry = ttk.Entry(root)
fft_vmax_entry.pack(side=tk.LEFT, padx=10)
fft_vmax_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# slope dist
slope_dist_label = ttk.Label(root, text="slope dist") #in the 2nd fft how far from index 0 should you calculate the slope
slope_dist_label.pack(side=tk.LEFT, padx=10)
slope_dist_entry = ttk.Entry(root)
slope_dist_entry.pack(side=tk.LEFT, padx=10)
slope_dist_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# stabilize hist
stab_hist_label = ttk.Label(root, text="stabilize history") #how many points above 0 in a row will be shown
stab_hist_label.pack(side=tk.LEFT, padx=10)
stab_hist_entry = ttk.Entry(root)
stab_hist_entry.pack(side=tk.LEFT, padx=10)
stab_hist_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter



# Initial plot
update_plot()

# Start the Tkinter event loop
root.mainloop()