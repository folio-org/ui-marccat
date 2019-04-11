#!/usr/bin/env bash
########################################################
# Synchronise remote test Folio ui-cataloging
#
# Author : Christian Chiama - christian.chiama@atcult.it
# Version: 1.0
# Date   : 10/04/2019
#########################################################

SSH_HOST=151.1.165.20
SSH_PORT=22022
SSH_USR=folio
SSH_DEST_FOLDER=/var/www/html/folio
SSH_SRC_FOLDER=/dist/
RESTART_WAIT_SEC=1


ssh_folio_frontside_deploy(){
  echo "Remove old ui-marccat artifact...."
  rm r-rf /dist
  echo "Run yarn build...."
  yarn build
  echo "uploading files via ssh on folio.frontside.atcult.it"
  scp -P ${SSH_PORT} ${SSH_SRC_FILE} ${SSH_USR}@${SSH_HOST}:${SSH_DEST_FOLDER}
  sleep ${RESTART_WAIT_SEC}
  echo "uploaded MARCcat artifact succesfully!"
  echo "folio.frontside.atcult.it is up and running...."
}
ssh_folio_frontside_deploy
