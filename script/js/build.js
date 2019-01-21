const cp = require('child_process');
const semafor = require('semafor');

const log = semafor();

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const prepareEnv = (installStripes) => {
  execSync('yarn config set @folio:registry https://repository.folio.org/repository/npm-folioci/');
  if (installStripes) execSync('yarn global add @folio/stripes-cli');
};

const stripFlowType = () => {
  log.ok('Remove Flow type');
  execSync('yarn flow-remove-types src/ -d lib/');
};

const observerOkapiRequest = () => {
  execSync('DEBUG=stripes-cli:okapi stripes okapi login diku_admin');
};

const lunchBuild = () => {
  log.ok('Prepare Environment....');
  prepareEnv(false);
  log.ok('Start building...');
  execSync('stripes build ./config/stripes.config.js --output dist/ --sourcemap --languages en');
  log.ok('End Building for language en-US');
};

const run = (stripFlow, observeOkapi) => {
  if (stripFlow) stripFlowType();
  if (observeOkapi) observerOkapiRequest();
  lunchBuild();
};

run(false, false);
