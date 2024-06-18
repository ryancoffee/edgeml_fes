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

def find_det_key(keys, detector):
    for i in keys:
        if len(str(detector)) == 1:
            detector = "0" + str(detector) # single digit detector number become 01, 02, etc.
        # print("detector: ", detector, " key: ", i, " ", str(detector) == i[-len(str(detector)):])
        if str(detector) == i[-len(str(detector)):]: #if end of key is detector number
            detector_key = i
    
    return detector_key


# Generate sample data for imshow
def generate_data(filename, detector1, detector2):
    nsamples = 512 #useful for reshaping
    with h5py.File("/sdf/scratch/coffee/edgeml_fes_data/"+filename, "r") as f:
        detector1_key = find_det_key(f['ece'].keys(), detector1)
        detector2_key = find_det_key(f['ece'].keys(), detector2)

        raw1 = ((f["ece"][detector1_key][()]*(1<<10)).astype(np.int32)) #raw data scaled
        raw2 = ((f["ece"][detector2_key][()]*(1<<10)).astype(np.int32)) #raw data scaled
        
        cov = np.cov(raw1, raw2)
        print(np.shape(cov))

        
        
    return raw1, raw2, cov

# Function to update the plot
def update_plot(*args):
    filename = filename_var.get()
        
    detector1 = detector1_var.get()
    try:
        detector1 = float(detector1)
    except ValueError:
        detector1 = 1
        
    
    detector2 = detector2_var.get()
    try:
        detector2 = float(detector2)
    except ValueError:
        detector2 = 2
        

    
    
    print(f"Filename: {filename}")
    print(f"Detector 1: {detector1}")
    print(f"Detector 2: {detector2}")
    raw1, raw2, cov = generate_data(str(filename), int(detector1), int(detector2))
    
    ax1.clear()
    im1 = ax1.plot(raw1)
    ax1.set_title("raw data for detector "+str(int(detector1)))
    
    ax2.clear()
    im2 = ax2.imshow(cov)
    cbar = fig.colorbar(im2, ax=ax2)
    ax2.set_title("covariance between "+str(int(detector1))+" and "+ str(int(detector2)))
    
    ax3.clear()
    im3 = ax3.plot(raw2)
    ax3.set_title("raw data for detector "+str(int(detector2)))   
    
    
    
    
    

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
fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(15, 5), gridspec_kw={'width_ratios': [1, 1, 1]})
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




# detector 1
detector1_var = tk.IntVar(value=1)
detector1_label = ttk.Label(frame_b, text="Enter Detector Number:")
detector1_label.pack(side=tk.LEFT, padx=10)
detector1_menu = ttk.Combobox(frame_b, textvariable=detector1_var)
detector1_menu['values'] = list(range(1, 49))
detector1_menu.pack(side=tk.LEFT, padx=10)
detector1_menu.bind('<<ComboboxSelected>>', update_plot)

# detector 2
detector2_var = tk.IntVar(value=1)
detector2_label = ttk.Label(frame_b, text="Enter Detector Number:")
detector2_label.pack(side=tk.LEFT, padx=10)
detector2_menu = ttk.Combobox(frame_b, textvariable=detector2_var)
detector2_menu['values'] = list(range(1, 49))
detector2_menu.pack(side=tk.LEFT, padx=10)
detector2_menu.bind('<<ComboboxSelected>>', update_plot)



# Initial plot
update_plot()

# Start the Tkinter event loop
root.mainloop()
