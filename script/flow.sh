#!/usr/bin/env bash
########################################################
# Script for run flow static type checking utility
#
# Author : Christian Chiama - christian.chiama@atcult.it
# Version: 1.0
# Date   : 20/04/2019
#########################################################

if [ ! -d "lib/" ]; then
    mkdir lib/
  else
    rm -rf lib/* 
fi

if [ ! -d "artifact/" ]; then
    mkdir artifact/
  else
    rm -rf artifact/* 
fi

#print all filw flowedify
yarn flow ls > artifact/all-file-flowed.js
#lunch flow type checking
yarn build:flow > artifact/flow-check.js