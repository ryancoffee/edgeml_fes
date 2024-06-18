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
    for i in range(stab_hist, len(clean)):
    # Check if the previous 10 elements are all greater than 0
        if any(np.abs(original[i-stab_hist:i]) < 10**epsilon):
            clean[i] = 0
        else:
            clean[i-stab_hist:i] = original[i-stab_hist:i]
    return clean



# Generate sample data for imshow
def generate_data(filename, detector, minimum_peak_height, fft_vmax, slope_dist, stab_hist, max_height):
    nsamples = 512 #useful for reshaping
    with h5py.File("/sdf/scratch/coffee/edgeml_fes_data/"+filename, "r") as f:
        
        for i in f['ece'].keys():
            if len(str(detector)) == 1:
                detector = "0" + str(detector) # single digit detector number become 01, 02, etc.
            # print("detector: ", detector, " key: ", i, " ", str(detector) == i[-len(str(detector)):])
            if str(detector) == i[-len(str(detector)):]: #if end of key is detector number
                detector_key = i

        raw = ((f["ece"][detector_key][()]*(1<<10)).astype(np.int32)) #raw data scaled

        raw_reshape = raw.reshape(-1,nsamples).T #reshape to be ? x 512

        fft = ((np.abs(rfft(np.concatenate((raw_reshape,np.flip(raw_reshape,axis=0)),axis=0),axis=0,norm='backward').real)).astype(np.int32)) #apply fft
        fft[:5, :] = 0 #first 5 rows to 0
        
        inds = np.where(np.sign(fft) == -1) #make sure there are no negatives
        fft[inds] = 0
        
        power_spec_classifier = np.zeros(len(fft.T))
        
        for col_count, col in enumerate(fft.T):
            cleaned_col = np.copy(col)
            if minimum_peak_height == -1:
                cleaned_col = cleaned_col * np.tanh(cleaned_col) #linearly scales but sends to 0 near 0
            else:
                cleaned_col[cleaned_col < minimum_peak_height] = 0 #set peaks in raw data below a certain height to 0
                cleaned_col[cleaned_col > max_height] = 0 #set peaks in raw data below a certain height to 0
                
            
            spec_2 = rfft(cleaned_col)
            spec_abs = np.power(np.abs(spec_2), int(2))
            instant_slope = spec_abs[0] - np.average(spec_abs[slope_dist: slope_dist + (slope_dist//10)]) # find difference between index 0 and index 50 of power spectrum of second fft
            power_spec_classifier[col_count] = instant_slope
            
        cleaned_power_spec_classifier = stabilize(power_spec_classifier, stab_hist)
            
        
        
    return raw, fft, cleaned_power_spec_classifier

# Function to update the plot
def update_plot(*args):
    filename = filename_var.get()
        
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
        fft_vmax = 1<<18
        
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
    
    max_height = max_height_entry.get()
    try:
        max_height = float(max_height)
    except ValueError:
        max_height = 1<<32
        
    fft_x_min = fft_x_min_entry.get()
    try:
        fft_x_min = float(fft_x_min)
    except ValueError:
        fft_x_min = 0
        
    fft_x_max = fft_x_max_entry.get()
    try:
        fft_x_max = float(fft_x_max)
    except ValueError:
        fft_x_max = -1
    
    
    print(f"Filename: {filename}")
    print(f"Detector: {detector}")
    print(f"Minimum Height: {minimum_height}")
    print(f"FFT Vmax: {fft_vmax}")
    print(f"Slope Distance: {slope_dist}")
    print(f"Stabilize History: {stab_hist}")
    print(f"Max Height: {max_height}")
    print(f"FFT X Min: {fft_x_min}")
    print(f"FFT X Max: {fft_x_max}")
    raw, fft, classified = generate_data(str(filename), int(detector), int(minimum_height), int(fft_vmax), int(slope_dist), int(stab_hist), int(max_height))
    
    ax1.clear()
    im1 = ax1.plot(raw)
    ax1.set_title("raw data for detector "+str(int(detector)))
    

    ax2.clear()
    im2 = ax2.imshow(fft, vmax=int(fft_vmax))  # Example: Using different colormap
    if fft_x_max == -1:
        ax2.set_xlim(fft_x_min, len(fft[0]))  # Adjust as needed
    else:
        ax2.set_xlim(fft_x_min, fft_x_max)

    ax2.invert_yaxis()
    ax2.set_title("fft for detector "+str(int(detector)))
    
    ax3.clear()
    im3 = ax3.plot(classified)  # Example: Using different colormap
    ax3.set_title("classifier for detector "+str(int(detector)))
    
    
    fft_means = np.mean((np.sort(fft, axis=0)[-20:, :]), axis=0)
    
    ax4.clear()
    im4 = ax4.plot(fft_means)  # find breathing by finding sinusodial pattern in intesity 
    ax4.set_title("fft mean value for detector "+str(int(detector)))
    
    
    
    
    
    

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
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 5), gridspec_kw={'width_ratios': [1, 1]})
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)


# # filename
# filename_label = ttk.Label(frame_b, text="filename:")
# filename_label.pack(side=tk.LEFT, padx=10)
# filename_entry = ttk.Entry(frame_b)
# filename_entry.pack(side=tk.LEFT, padx=10)
# filename_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

files = os.listdir("/sdf/scratch/coffee/edgeml_fes_data/")
# filename selector
filename_var = tk.StringVar(value="shot_163500.h5")
filename_label = ttk.Label(frame_b, text="Enter Detector Number:")
filename_label.pack(side=tk.LEFT, padx=10)
filename_menu = ttk.Combobox(frame_b, textvariable=filename_var)
filename_menu['values'] = files
filename_menu.pack(side=tk.LEFT, padx=10)
filename_menu.bind('<<ComboboxSelected>>', update_plot)




# detector
detector_var = tk.IntVar(value=1)
detector_label = ttk.Label(frame_b, text="Enter Detector Number:")
detector_label.pack(side=tk.LEFT, padx=10)
detector_menu = ttk.Combobox(frame_b, textvariable=detector_var)
detector_menu['values'] = list(range(1, 49))
detector_menu.pack(side=tk.LEFT, padx=10)
detector_menu.bind('<<ComboboxSelected>>', update_plot)

# min peak height
min_height_label = ttk.Label(frame, text="Enter Min fft Peak Height, set to -1 for xtanhx:")
min_height_label.pack(side=tk.LEFT, padx=10)
min_height_entry = ttk.Entry(frame)
min_height_entry.pack(side=tk.LEFT, padx=10)
min_height_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# max peak height
max_height_label = ttk.Label(frame, text="Enter Max fft Peak Height")
max_height_label.pack(side=tk.LEFT, padx=10)
max_height_entry = ttk.Entry(frame)
max_height_entry.pack(side=tk.LEFT, padx=10)
max_height_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# fft vmax
fft_vmax_label = ttk.Label(frame_b, text="fft vmax:")
fft_vmax_label.pack(side=tk.LEFT, padx=10)
fft_vmax_entry = ttk.Entry(frame_b)
fft_vmax_entry.pack(side=tk.LEFT, padx=10)
fft_vmax_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# fft x min
fft_x_min_label = ttk.Label(frame_b, text="x min for fft") #in the 2nd fft how far from index 0 should you calculate the slope
fft_x_min_label.pack(side=tk.LEFT, padx=10)
fft_x_min_entry = ttk.Entry(frame_b)
fft_x_min_entry.pack(side=tk.LEFT, padx=10)
fft_x_min_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# fft x max
fft_x_max_label = ttk.Label(frame_b, text="x max for fft") #in the 2nd fft how far from index 0 should you calculate the slope
fft_x_max_label.pack(side=tk.LEFT, padx=10)
fft_x_max_entry = ttk.Entry(frame_b)
fft_x_max_entry.pack(side=tk.LEFT, padx=10)
fft_x_max_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter


# slope dist
slope_dist_label = ttk.Label(frame, text="slope dist") #in the 2nd fft how far from index 0 should you calculate the slope
slope_dist_label.pack(side=tk.LEFT, padx=10)
slope_dist_entry = ttk.Entry(frame)
slope_dist_entry.pack(side=tk.LEFT, padx=10)
slope_dist_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter

# stabilize hist
stab_hist_label = ttk.Label(frame, text="stabilize history") #how many points above 0 in a row will be shown
stab_hist_label.pack(side=tk.LEFT, padx=10)
stab_hist_entry = ttk.Entry(frame)
stab_hist_entry.pack(side=tk.LEFT, padx=10)
stab_hist_entry.bind('<Return>', update_plot)  # Update plot when pressing Enter



# Initial plot
update_plot()

# Start the Tkinter event loop
root.mainloop()
