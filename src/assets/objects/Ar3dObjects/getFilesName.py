#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct  8 18:36:36 2019

@author: josue
"""

from os import scandir, getcwd

def ls(ruta = getcwd()):
    for arch in scandir(ruta):
        if arch.is_file():
            print("%s: require('./Ar3dObjects/%s')," % (arch.name, arch.name))

ls()
            
  
  