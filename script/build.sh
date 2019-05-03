#!/usr/bin/env bash
########################################################
# Synchronise remote test Folio ui-cataloging
#
# Author : Christian Chiama - christian.chiama@atcult.it
# Version: 1.0
# Date   : 10/04/2019
#########################################################

rebuild=false
while test $# -gt 0; do
  case "$1" in
    --rebuild)
      rebuild=true
      shift
      ;;
    *)
      break
      ;;
  esac
done

if $rebuild
then
  echo 'Rebuilding'
fi

if $rebuild
  then
    rm -rf node_modules package-lock.json
  fi
  yarn install
echo "build successfully"