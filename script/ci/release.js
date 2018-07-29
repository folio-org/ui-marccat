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

const prepareNodeEnvironment = () => {
   process.env.MAJOR_VERSION = pkg.version;
   process.env.GIT_EMAIL = pkg.contributors[0].email;
   process.env.GIT_USER = pkg.contributors[0].username;
   process.env.DEV_REPOSITORY = pkg.repository;
   process.env.GIT_BRANCH = ONLY_ON_MASTER;
};

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

const setupGit = () => {
  execSyncSilent(`git config --global push.default simple`);
  execSyncSilent(`git config --global user.email "${process.env.GIT_EMAIL}"`);
  execSyncSilent(`git config --global user.name "${process.env.GIT_USER}"`);
  const remoteUrl = execSync(`git remote -v`)
  //execSyncSilent(`git remote add deploy "https://${process.env.DEV_REPOSITORY}"`);
  //execSyncSilent(`git remote add deploy "https://${process.env.GIT_USER}:${process.env.GIT_TOKEN}@${remoteUrl}"`);
  console.log('force push pre release....')
  execSync(`git add --all;git commit -nam "commit pre-release";git push`);
  execSync(`git checkout ${ONLY_ON_MASTER}`);
}

const createNpmFolioPackage = () => {
  execSync(`rm -f package-lock.json`);
  const content = `email=\${NPM_EMAIL}//registry.npmjs.org/:_authToken=\${NPM_TOKEN}`;
  fs.writeFileSync(`.npmrc`, content);
}

const findCurrentPublishedVersion = () => {
  return execSyncRead(`npm view ${process.env.npm_package_name} dist-tags.${VERSION_TAG}`);
}

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

const tagAndPush = (newVersion) => {
  console.log(`trying to publish ${newVersion}...`);
  execSync(`npm --no-git-tag-version version ${newVersion}`);
 // execSyncRead(`npm publish --tag ${VERSION_TAG}`);
  execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  execSyncSilent(`git push deploy ${newVersion} || true`);
}

const run = () => {
  prepareNodeEnvironment();
  setupGit();
  tryTagAndPush(process.env.MAJOR_VERSION);
}

run();
