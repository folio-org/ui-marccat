/* eslint-disable no-console */
/* eslint-disable quotes */
const cp = require('child_process');
const semver = require('semver');
const fs = require('fs');
const pkg = require('../../package');


const ONLY_ON_MASTER = 'origin/master';
const VERSION_TAG = 'alpha';
const PATCH = 'patch';

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

function validateEnv() {
  if (!process.env.JENKINS_CI) {
    throw new Error(`releasing is only available from CI`);
  }

  if (!process.env.JENKINS_MASTER) {
    console.log(`not publishing on a different build`);
    return false;
  }

  if (process.env.GIT_BRANCH !== ONLY_ON_MASTER) {
    console.log(`not publishing on branch ${process.env.GIT_BRANCH}`);
    return false;
  }

  return true;
}

function setupGit() {
  execSyncSilent(`git config --global push.default simple`);
  execSyncSilent(`git config --global user.email "${process.env.GIT_EMAIL}"`);
  execSyncSilent(`git config --global user.name "${process.env.GIT_USER}"`);
  const remoteUrl = execSync(`git remote -v`)
  execSyncSilent(`git remote add deploy "https://${process.env.DEV_REPOSITORY}"`);
  //execSyncSilent(`git remote add deploy "https://${process.env.GIT_USER}:${process.env.GIT_TOKEN}@${remoteUrl}"`);
  execSync(`git checkout ${ONLY_ON_MASTER}`);
}

function createNpmFolioPackage() {
  execSync(`rm -f package-lock.json`);
  const content = `
email=\${NPM_EMAIL}
//registry.npmjs.org/:_authToken=\${NPM_TOKEN}
`;
  fs.writeFileSync(`.npmrc`, content);
}

const findVersion = async () => {
  const packageVersion = semver.clean(process.env.npm_package_version);
  console.log(`package version: ${packageVersion}`);
};

function versionTagAndPublish() {
  const packageVersion = semver.clean(process.env.npm_package_version);
  console.log(`package version: ${packageVersion}`);

  const currentPublished = findCurrentPublishedVersion();
  console.log(`current published version: ${currentPublished}`);

  const version = semver.gt(packageVersion, currentPublished) ? packageVersion : semver.inc(currentPublished, PATCH);
  tryPublishAndTag(version);
}

function findCurrentPublishedVersion() {
  return execSyncRead(`npm view ${process.env.npm_package_name} dist-tags.${VERSION_TAG}`);
}

function tryPublishAndTag(version) {
  let theCandidate = version;
  for (let retry = 0; retry < 5; retry++) {
    try {
      tagAndPublish(theCandidate);
      console.log(`Released ${theCandidate}`);
      return;
    } catch (err) {
      const alreadyPublished = _.includes(err.toString(), 'You cannot publish over the previously published version');
      if (!alreadyPublished) {
        throw err;
      }
      console.log(`previously published. retrying with increased ${PATCH}...`);
      theCandidate = semver.inc(theCandidate, PATCH);
    }
  }
}

function tagAndPublish(newVersion) {
  console.log(`trying to publish ${newVersion}...`);
  execSync(`npm --no-git-tag-version version ${newVersion}`);
  execSyncRead(`npm publish --tag ${VERSION_TAG}`);
  execSync(`git tag -a ${newVersion} -m "${newVersion}"`);
  execSyncSilent(`git push deploy ${newVersion} || true`);
}

function run() {
  // if (!validateEnv()) {
  //   return;
  // }
  // setupGit();
  // createNpmFolioPackage();
  // versionTagAndPublish();
  	prepareNodeEnvironment();
console.log(process.env);
setupGit()
}

run();
