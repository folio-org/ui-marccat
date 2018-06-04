#!/usr/bin/env node
const cp = require('child_process');

cp.execSync('rm -rf node_modules');
cp.execSync('rm -rf dist');
cp.execSync('rm -rf .circleci');
cp.execSync('rm -rf config/json');

