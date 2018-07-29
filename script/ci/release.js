/* eslint-disable no-console */
const cp = require('child_process');
const semver = require('semver');
const fs = require('fs');
const _ = require('lodash');
const pkg = require('../../package');


const ONLY_ON_MASTER = 'origin/master';
const VERSION_TAG = 'alpha';
const VERSION_INC = 'patch';

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
   process.env.MAJOR_VERSION = pkg.version;
   process.env.NPM_PACKAGE_NAME = pkg.name;
   process.env.FOLIO_MODULE = pkg.appName;
   process.env.GIT_EMAIL = pkg.contributors[0].email;
   process.env.GIT_USERNAME = pkg.contributors[0].username;
   process.env.DEV_REPOSITORY = pkg.repository;
   process.env.GIT_BRANCH = ONLY_ON_MASTER;

   //CIRCLE CI
   process.env.CIRCLE_CI = false; // per il momento rilasciamo manualmente
   process.env.CIRCLE_BRANCH = process.env.GIT_BRANCH;
   process.env.CIRCLE_TAG = process.env.GIT_BRANCH;
   process.env.CIRCLE_PROJECT_USERNAME = process.env.GIT_USERNAME;
   process.env.CIRCLE_PROJECT_REPONAME = process.env.DEV_REPOSITORY
};

/**
 * Setup Circle CI Environment variables
 */
const validateEnvironment = () => {
  if (!process.env.CIRCLE_CI) {
    throw new Error(`releasing is only available from CI`);
  }

  if (!process.env.CIRCLE_CI_MASTER) {
    console.log(`not publishing on a different build`);
    return false;
  }

  if (process.env.GIT_BRANCH !== ONLY_ON_MASTER) {
    console.log(`not publishing on branch ${process.env.GIT_BRANCH}`);
    return false;
  }

  return true;
}

/**
 * Setup Git Environment variables
 */
const setupGit = () => {
  execSyncSilent(`git config --global push.default simple`);
  execSyncSilent(`git config --global user.email "${process.env.GIT_EMAIL}"`);
  execSyncSilent(`git config --global user.name "${process.env.GIT_USERNAME}"`);
  console.log('Check repository....')
  execSync(`git remote -v`)
  console.log('force stash pre release....')
  execSync(`git stash`);
  execSync(`git checkout ${ONLY_ON_MASTER}`);
}

/**
 * Create Folio package and pubblish on Npm
 */
const createNpmFolioPackage = () => {
  execSync(`rm -f package-lock.json`);
  const content = `email=\${NPM_EMAIL}//registry.npmjs.org/:_authToken=\${NPM_TOKEN}`;
  fs.writeFileSync(`.npmrc`, content);
}

/**
 * Find current and last Npm pubblish version
 */
const findCurrentPublishedVersion = () => {
  return execSync(`npm view ${process.env.NPM_PACKAGE_NAME} dist-tags.${VERSION_TAG}`);
}

/**
 * Create Tag Release and push on remote repository
 */
const tryTagAndPush = (version) => {
  let theCandidate = version;
  for (let retry = 0; retry < 5; retry++) {
    try {
      tagAndPush(theCandidate);
      console.log(`Released ${theCandidate}`);
      return;
    } catch (err) {
      const alreadyPublished = _.includes(err.toString(), 'You cannot publish over the previously published version');
      if (!alreadyPublished) {
        throw err;
      }
      console.log(`previously published. retrying with increased ${VERSION_INC}...`);
      theCandidate = semver.inc(theCandidate, VERSION_INC);
    }
  }
}

/**
 * Create Tag Release and push on remote repository
 */
const tagAndPush = (newVersion) => {
  console.log(`trying to publish ${process.env.FOLIO_MODULE} - ${newVersion}...`);
  execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  execSyncSilent(`git push origin ${newVersion} || true`);
}

/**
 * Lunch Release process
 */
const lunchRelease = () => {
  prepareNodeEnvironment();
  setupGit();
  tryTagAndPush(process.env.MAJOR_VERSION);
}

lunchRelease();
