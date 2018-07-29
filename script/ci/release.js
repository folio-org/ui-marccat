/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const cp = require('child_process');
const semver = require('semver');
const fs = require('fs');
const _ = require('lodash');
const semafor = require('semafor');

const pkg = require('../../package');

const log = semafor();

const ONLY_ON_MASTER = 'master';
const VERSION_TAG = 'alpha';
const VERSION_INC = 'patch';
const NPM_EMAIL = '';
const NPM_TOKEN = '';

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const execSyncSilent = (cmd) => {
  execSync(cmd, { stdio: ['ignore', 'ignore', 'ignore'] });
};

/**
 * Setup Node Environment variables
 */
const prepareNpmEnvironment = () => {
  log.ok('Setup Npm Environment');
  process.env.MAJOR_VERSION = pkg.version;
  process.env.NPM_PACKAGE_NAME = pkg.name;
  process.env.FOLIO_MODULE = pkg.appName;
  process.env.GIT_NAME = pkg.contributors[0].name;
  process.env.GIT_EMAIL = pkg.contributors[0].email;
  process.env.GIT_USERNAME = pkg.contributors[0].username;
  process.env.DEV_REPOSITORY = pkg.repository;
  process.env.GIT_BRANCH = ONLY_ON_MASTER;

  // CIRCLE CI
  process.env.CIRCLE_CI = false; // per il momento rilasciamo manualmente
  process.env.CIRCLE_BRANCH = process.env.GIT_BRANCH;
  process.env.CIRCLE_TAG = process.env.GIT_BRANCH;
  process.env.CIRCLE_PROJECT_USERNAME = process.env.GIT_USERNAME;
  process.env.CIRCLE_PROJECT_REPONAME = process.env.DEV_REPOSITORY;
};

/**
 * Setup Circle CI Environment variables
 */
const validateEnvironment = () => {
  if (!process.env.CIRCLE_CI) {
    throw new Error('releasing is only available from CI');
  }

  if (!process.env.CIRCLE_CI_MASTER) {
    console.log('not publishing on a different build');
    return false;
  }

  if (process.env.GIT_BRANCH !== ONLY_ON_MASTER) {
    console.log(`not publishing on branch ${process.env.GIT_BRANCH}`);
    return false;
  }

  return true;
};

/**
 * Setup Git Environment variables
 */
const setupGit = () => {
  log.ok('Setup Git Environemnt.....');
  execSyncSilent('git config --global push.default simple');
  execSyncSilent(`git config --global user.email "${process.env.GIT_EMAIL}"`);
  execSyncSilent(`git config --global user.name "${process.env.GIT_USERNAME}"`);
  log.ok('Check repository....');
  execSync('git remote -v');
  log.ok('force stash pre release....');
  execSync('git stash');
  log.ok('Checkout master branch....');
  execSync(`git checkout ${ONLY_ON_MASTER}`);
};

/**
 * Create Folio package and pubblish on Npm
 */
const createNpmFolioPackage = () => {
  execSync('rm -f package-lock.json');
  const content = `email=${NPM_EMAIL}//registry.npmjs.org/:_authToken=${NPM_TOKEN}`;
  fs.writeFileSync('.npmrc', content);
};

/**
 * Find current and last Npm pubblish version
 */
const findCurrentPublishedVersion = () => {
  return execSync(`npm view ${process.env.NPM_PACKAGE_NAME} dist-tags.${VERSION_TAG}`);
};

/**
 * Create Tag Release and push on remote repository
 */
const tagAndPush = (newVersion) => {
  log.ok(`trying to publish ${process.env.FOLIO_MODULE} - ${newVersion}...`);
  execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  execSyncSilent(`git push origin ${newVersion} || true`);
  log.ok(`Release Manager: ${process.env.GIT_NAME}!`);
};

/**
 * Create Tag Release and push on remote repository
 */
const tryTagAndPush = (version) => {
  log.ok('Start Release process....');
  let theCandidate = version;
  for (let retry = 0; retry < 5; retry++) {
    try {
      tagAndPush(theCandidate);
      log.ok(`Released ${process.env.FOLIO_MODULE} Version: ${theCandidate} succesfully!`);
      return;
    } catch (err) {
      const alreadyPublished = _.includes(err.toString(), 'You cannot publish over the previously published version');
      if (!alreadyPublished) {
        throw err;
      }
      log.warn(`previously published. retrying with increased ${VERSION_INC}...`);
      theCandidate = semver.inc(theCandidate, VERSION_INC);
    }
  }
};

/**
 * Check the version release and the current to release
 */
const versionTagAndPush = () => {
  const packageVersion = semver.clean(process.env.MAJOR_VERSION);
  log.ok(`package version: ${packageVersion}`);

  const currentPublished = findCurrentPublishedVersion();
  log.ok(`current published version: ${currentPublished}`);

  const version = semver.gt(packageVersion, currentPublished) ? packageVersion : semver.inc(currentPublished, VERSION_INC);
  tryTagAndPush(version);
};

/**
 * Lunch Release process
 */
const lunchRelease = () => {
  prepareNpmEnvironment();
  setupGit();
  tryTagAndPush(process.env.MAJOR_VERSION);
};

lunchRelease();
