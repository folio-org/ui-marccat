#!/usr/bin/env bash
########################################################
# Synchronise remote test Folio ui-cataloging
#
# Author : Christian Chiama - christian.chiama@atcult.it
# Version: 1.0
# Date   : 10/04/2019
#########################################################

check_system(){
    if [[ "$OSTYPE" == "linux-gnu" ]]; then
        echo 'linux'
        elif [[ "$OSTYPE" == "darwin"* ]]; then
        export $(cat .env | xargs)
        elif [[ "$OSTYPE" == "win32" ]]; then
        export $(cat .env | xargs) && set
        elif [[ "$OSTYPE" == "freebsd"* ]]; then
        echo 'freebsd'
    fi
}

check_system