#!/usr/bin/env bash
########################################################
# Synchronise remote test Folio ui-cataloging
#
# Author : Christian Chiama - christian.chiama@atcult.it
# Version: 1.0
# Date   : 10/04/2019
#########################################################


check_okapi_is_running(){
curl --fail http://localhost:9130/_/proxy/health || exit 1
}