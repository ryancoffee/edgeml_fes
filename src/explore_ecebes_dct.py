#!/home/rc8936/.conda/envs/rnc_fes/bin/python

import numpy as np
import h5py
import sys
import re
import cv2
from scipy import fft,stats

def tanh(x,w):
    return 0.5*(1.+np.tanh(x/w))

def relu(x):
    return x * (x>0)

def qfilt(shape,ilim):
    mask = [np.zeros(shape,dtype=float) for k in range(3)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(3)]
    ilim = int(5)
    width = float(ilim)
    x = np.tile(np.arange(5).astype(float)/width,(shape[1],1)).T
    mask[0][:ilim,:] = 0.5*(1.+np.sin(x*np.pi))
    mask[1][:ilim,:] = -np.cos(x*np.pi)*0.5*(1.+np.sin(x*np.pi))
    mask[2][:ilim,:] = -np.cos(x*2*np.pi)*0.5*(1.+np.sin(x*np.pi))
    for i in range(len(mask)):
        mask[i] = np.roll(mask[i],-ilim//2,axis=0)
        MASK[i] = np.fft.fft(mask[i],axis=0)
    return mask,MASK

'''
def dct_mask(shape,lims):
    mask = [np.zeros(shape,dtype=float) for k in range(3)]
    XX = np.tile(np.arange(lims[0]),(lims[1],1)).T
    YY = np.tile(np.arange(lims[1]),(lims[0],1))


    mask[:]

    return mask,MASK
'''


def getmask_deep(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(12)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(12)]
    mask[0][:3,0::2] = 0.333
    x=np.eye(3,3)
    xu = np.triu(np.roll(x,-1,axis=0))
    xu += np.flip(np.flip(xu,axis=0),axis=1)
    mask[1][:3,:3] =0.333*xu.copy()
    mask[2][0:2,:] = .333
    mask[3][:3,:3] = 0.333*xu.T.copy()
    mask[4][:3,0::2] = -0.666
    mask[5][:3,:3] = -.666*xu.copy()
    mask[6][0::2,:3] = -0.666
    mask[7][:3,:3] = -.666*xu.T.copy()
    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-1,axis=0),-1,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def getmask(shape):
    mask = [np.zeros(shape,dtype = float) for k in range(4)]
    MASK = [np.zeros(shape,dtype = complex) for k in range(4)]
    mask[0][:3,1] = 1.
    mask[1][:3,:3] = np.eye(3)
    mask[2][1,:3] = 1.
    mask[3][:3,:3] = np.fliplr(np.eye(3))
    for i in range(len(mask)):
        mask[i] = np.roll(np.roll(mask[i],-1,axis=0),-1,axis=1)
        MASK[i] = np.fft.fft2(mask[i])
    return mask,MASK

def dct_deriv_buildfilt(shape,cutoff=256):
    FREQ = np.arange(shape[0],dtype=float)
    filt = np.zeros(FREQ.shape[0],dtype=float)
    filt[:int(cutoff)] = FREQ[int(cutoff)]*(1.+np.cos(np.pi*FREQ[:int(cutoff)]/float(cutoff)))
    return np.tile(filt,(shape[1],1)).T

def dct_buildfilt2d(shp,cutoffs=(256,512)):
    filt = np.zeros(shp,dtype=float)
    XX=np.tile(np.arange(cutoffs[0]),(cutoffs[1],1)).T
    YY=np.tile(np.arange(cutoffs[1]),(cutoffs[0],1))
    filt[:cutoffs[0],:cutoffs[1]] = 0.25*(2. + np.cos(np.pi*XX/float(cutoffs[0])) + np.cos(np.pi*YY/float(cutoffs[1])))
    return filt

def dct_buildfilt(shape,cutoff=256):
    filt = np.zeros(shape[0],dtype=float)
    filt[:int(cutoff)] = 0.5*(1.+np.cos(np.pi*np.arange(int(cutoff),dtype=float)/float(cutoff)))
    return np.tile(filt,(shape[1],1)).T

def buildfilt(nsamples,nrolls,cutoff=0.01):
    FREQ = np.fft.fftfreq(nsamples)
    filt = np.zeros(FREQ.shape[0],dtype=float)
    inds = np.where(np.abs(FREQ)<cutoff)
    filt[inds] = 0.5*(1.+np.cos(np.pi*FREQ[inds]/cutoff))
    return np.tile(filt,(nrolls,1)).T

def getextrema(t1,t2):
    tmin = np.max([np.min(t1),np.min(t2)])
    tmax = np.min([np.max(t1),np.max(t2)])
    return tmin,tmax

def bipolarlognorm(inmat):
    posinds = np.argwhere(inmat>0)
    neginds = np.argwhere(inmat<0)
    ypos = np.log(np.abs(inmat[posinds]))
    ypos -= np.min(ypos)
    ypos = (ypos.astype(float)*254/np.max(ypos) + 1).astype(int)
    yneg = np.log(np.abs(-1*inmat[neginds]))
    yneg -= np.min(ypos)
    yneg = (yneg.astype(float)*254/np.max(yneg) + 1).astype(int)
    out = np.zeros(inmat.shape,dtype=int)
    out[posinds] = ypos
    out[neginds] = -1*yneg
    return out

def findroot(th,g):
    # using 2 step Newton-Raphson to find the root that tells me the limit above which the max p = log(histogram value)
    powrange = np.arange(4)
    for i in range (4):
        xpows = np.power(np.full(powrange.shape,g),powrange)
        g -= xpows.dot(th)/(powrange[1:]*xpows[:-1]).dot(th[1:])
    return g

def main():
    #path = '/projects/EKOLEMEN/ecebes'
    path = '/projects/EKOLEMEN/ecebes'
    shot = 122117
    if len(sys.argv)>1:
        m = re.search('^(.+)(\d{6})$',sys.argv[1])
        if m:
            path = m.group(1)
            shot = int(m.group(2))
    else:
        print('syntax: %s <path/filehead'%sys.argv[0])
    ecefile = '%s/%i%s'%(path,shot,'ECE')
    besfile = '%s/%i%s'%(path,shot,'BES')
    outfile = './data/%s_dct.h5'%(shot)

    with h5py.File(outfile,'w') as f:
        data_ece = np.load(ecefile,allow_pickle=True)
        data_bes = np.load(besfile,allow_pickle=True)
        chans_ece = list(data_ece.keys())
        chans_bes = list(data_bes.keys())
        t_ece = ((data_ece[chans_ece[0]]['data.time']+0.00025)*1e3).astype(int)
        t_bes = ((data_bes[chans_bes[0]]['data.time']+0.00025)*1e3).astype(int)
        tmin,tmax = getextrema(t_bes,t_ece)
        print(tmin,tmax)
        inds_ece_coince = np.where((t_ece>tmin) * (t_ece<tmax))
        inds_bes_coince = np.where((t_bes>tmin) * (t_bes<tmax))
        sz_ece = t_ece[inds_ece_coince].shape[0]
        sz_bes = t_bes[inds_bes_coince].shape[0]
        print('sz_ece = %i\tsz_bes = %i\tsz_bes-2*sz_ece = %i'%(sz_ece,sz_bes,(sz_bes-2*sz_ece)))
        nsamples = 1024
        nfolds = int(sz_ece//nsamples)
        print('nfolds*nsamples = ',nfolds*nsamples)
        t = t_ece[inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
        f.create_dataset('times',data=t)
        grp_ece = f.create_group('ece')


        mask,MASK = getmask((nsamples,nfolds))
        #mask,MASK = getmask_deep((nsamples,nfolds))
        filt = buildfilt(nsamples,nfolds,cutoff=.10)# by inspection this looks good for BG subtraction on ECE images
        dct_filt2d = dct_buildfilt2d((nsamples,nfolds*2),cutoffs=(nsamples//16,nfolds//4)) # remember, we need to mirror the nfolds dimension, thus the *2
        dct_filt = dct_buildfilt((nsamples,nfolds),cutoff=64) # remember, we need to mirror the nfolds dimension, thus the *2

        for ch in chans_ece[0]:
            m = re.search('^ece.{2}(\d+)$',ch)
            if m:
                print('%s\t%s\t%ix%i'%(m.group(0),m.group(1),nsamples,nfolds))
                if data_ece[ch]['data.ECE'].shape[0]>1:
                    x = data_ece[ch]['data.ECE'][inds_ece_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    X = np.fft.fft(x,axis=0) #np.row_stack((x,np.flipud(x))),axis=0)
                    AX = np.abs(X)
                    #PX = np.angle(X)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt,axis = 0)
                    OUT -= BG
                    OUT[0,:] = 0
                    OUT *= (OUT>0)
                    OUT *= (2**16-1)/np.max(OUT)
                    grp_ece.create_dataset('%s_logabs'%m.group(1),data=OUT[:nsamples,:nfolds].astype(np.uint16))
                    cv2.imwrite('./figs/gray/ece/shot%i/logabs_ece_shot%i_ch%s.png'%(shot,shot,m.group(1)),(255-OUT[:,:2*(OUT.shape[1]//2)] //2**6).astype(np.uint8))

                    '''
                    OK, the powerspectrum here is necessarily symmetric in axis0, and the phase is neccesarily anti-symmetric.
                    We should be able to use the discrete cosine and sine transforms.
                    '''
                    if True:
                        DFTOUT = np.fft.fft2(OUT)
                        NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                        for i in range(len(MASK)):
                            NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                        NEWOUT *= (NEWOUT>0)
                        grp_ece.create_dataset('%s_directional'%(m.group(1)),data=(NEWOUT[:nsamples//2,:,:]).astype(np.int16))
                        cv2.imwrite('./figs/color/ece_shot%i_ch%s_color1.png'%(shot,m.group(1)),(NEWOUT//2**8).astype(np.uint8)[:,:,:3])
                        cv2.imwrite('./figs/color/ece_shot%i_ch%s_color2.png'%(shot,m.group(1)),(NEWOUT//2**8).astype(np.uint8)[:,:,3:])

        '''
        print(chans_bes)
        print(chans_bes[-2],(data_bes[chans_bes[-1]]))
        print(chans_bes[-1],(data_bes[chans_bes[-1]]))
        '''
        #dct_filt_bes = dct_buildfilt((nsamples,nfolds),cutoff=2) # remember, we need to mirror the nfolds dimension, thus the *2
        grp_bes = f.create_group('bes')
        for ch in chans_bes[0]:
            #if ((type(data_bes[ch]['data.BES'])!=type(None))):# and 
            m = re.search('^bes.{2}(\d+)',ch)
            if m:
                print('%s\t%s\t%ix%i'%(m.group(0),m.group(1),nsamples,nfolds))
                if (data_bes[ch]['data.BES'].shape[0]>1):
                    x = data_bes[ch]['data.BES'][inds_bes_coince[0][:nsamples*nfolds*2:2]].reshape(nfolds,nsamples).T
                    X = np.fft.fft(x,axis=0)
                    AX = np.abs(X)
                    #PX = np.angle(X)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    #BG = fft.idct(fft.dct(OUT,axis=0) * dct_filt_bes ,axis=0)
                    #OUT -= BG
                    OUT[:2,:] = 0
                    OUT[-2:,:] = 0
                    OUT *= (2**16-1)/np.max(OUT)
                    grp_bes.create_dataset('%s_logabs'%m.group(1),data=OUT[:nsamples,:].astype(np.uint16))
                    cv2.imwrite('./figs/gray/bes/shot%i/logabs_bes_shot%i_ch%s.png'%(shot,shot,m.group(1)),(255-OUT[:,:2*(OUT.shape[1]//2)]//2**7).astype(np.uint8))

                    if True:
                        DFTOUT = np.fft.fft2(OUT)
                        NEWOUT = np.zeros((DFTOUT.shape[0],DFTOUT.shape[1],len(MASK)),dtype=float)
                        for i in range(len(MASK)):
                            NEWOUT[:,:,i] = np.fft.ifft2(DFTOUT*MASK[i]).real
                        NEWOUT *= (NEWOUT>0)
                        grp_bes.create_dataset('%s_directional'%(m.group(1)),data=(NEWOUT[:nsamples//2,:,:]).astype(np.uint16))
                        cv2.imwrite('./figs/color/bes_shot%i_ch%s_color1.png'%(shot,m.group(1)),(255-NEWOUT//2**9).astype(np.uint8)[:,:,[0,1,2]])
                        cv2.imwrite('./figs/color/bes_shot%i_ch%s_color2.png'%(shot,m.group(1)),(255-NEWOUT//2**9).astype(np.uint8)[:,:,[2,3,3]])

        nsamples = 32
        nfolds = int(sz_bes//nsamples)
        cutoff = 16
        dct_finefilt = dct_buildfilt((nsamples*2,nfolds),cutoff=cutoff)
        thresh = 1
        for ch in chans_bes:
            #if ((type(data_bes[ch]['data.BES'])!=type(None))):# and 
            m = re.search('^bes.{2}(\d+)',ch)
            if m:
                print('%s\t%s\t%ix%i'%(m.group(0),m.group(1),nsamples,nfolds))
                if (data_bes[ch]['data.BES'].shape[0]>1):
                    ## Now working on fine time resolution (wide frequency) since ELMs "pop" and then "deplete" and then "recover" all within a single millisecond
                    #total = nsamples*nfolds*2
                    #nsamples = 64
                    #nfolds = (total//nsamples//2)*2
                    x = data_bes[ch]['data.BES'][inds_bes_coince[0][:nsamples*nfolds]].reshape(nfolds,nsamples).T
                    X = np.row_stack((x,np.flip(x,axis=0)))
                    np.savetxt('./figs/gray/bes/shot%i/signal_fine_bes_shot%i_ch%s.dat'%(shot,shot,m.group(1)),x[:nsamples,4*10000:4*10250])
                    DC = fft.dct(X,axis=0)
                    HP = fft.idct(DC*(1-dct_finefilt),axis=0)
                    #LP = fft.idct(DC*dct_finefilt,axis=0)
                    #LADC = np.log2(1+np.abs(DC))
                    #LADC[0,:] *= np.sign(DC[0,:])
                    np.savetxt('./figs/gray/bes/shot%i/dct_fine_bes_HP_shot%i_ch%s.dat'%(shot,shot,m.group(1)),HP[:nsamples,4*10000:4*10250])
                    #np.savetxt('./figs/gray/bes/shot%i/dct_fine_bes_LP_shot%i_ch%s.dat'%(shot,shot,m.group(1)),LP[:nsamples,4*10000:4*10250])
                    RC = DC[0,:]
                    ELM = np.max(HP,axis=0) # lim is likely 10V so presumably
                    ELM *= 255/10
                    ARG = np.argmax(HP,axis=0).astype(np.uint16) * (ELM>thresh)
                    #hpdset = grp_bes.create_dataset('%s_dct_fine'%(m.group(1)),data=(DC[nsamples,:]).astype(np.uint16))
                    elmdset = grp_bes.create_dataset('%s_elm'%(m.group(1)),data=(ELM).astype(np.uint16))
                    argdset = grp_bes.create_dataset('%s_arg'%(m.group(1)),data=(ARG).astype(np.uint16))
                    recdset = grp_bes.create_dataset('%s_rec'%(m.group(1)),data=(RC).astype(np.uint16))
                    elmdset.attrs['cutoff+'] = cutoff
                    elmdset.attrs['thresh'] = thresh
                    argdset.attrs['cutoff+'] = cutoff
                    recdset.attrs['cutoff-'] = cutoff

                    np.savetxt('./figs/gray/bes/shot%i/dct_fine_bes_RC_shot%i_ch%s.dat'%(shot,shot,m.group(1)),RC[4*10000:4*10250])
                    np.savetxt('./figs/gray/bes/shot%i/dct_fine_bes_ELM_shot%i_ch%s.dat'%(shot,shot,m.group(1)),np.column_stack((ELM,ARG))[4*10000:4*10250,:])
                    '''
                    X = np.fft.fft(x,axis=0)
                    AX = np.abs(X)
                    if np.max(AX)==0:
                        continue
                    OUT = np.log2(AX+1)
                    OUT[:2,:] = 0
                    OUT[-2:,:] = 0
                    OUT *= (2**16-1)/np.max(OUT)
                    grp_bes.create_dataset('%s_logabs_fine'%m.group(1),data=OUT[:nsamples,:].astype(np.uint16))
                    cv2.imwrite('./figs/gray/bes/shot%i/logabs_fine_bes_shot%i_ch%s.png'%(shot,shot,m.group(1)),(255-OUT[:,:2*(OUT.shape[1]//2)]//2**7).astype(np.uint8))
                    '''

        #closing with h5py.File() as f
    
    return

if __name__ == '__main__':
    main()
