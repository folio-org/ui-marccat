const cp = require('child_process');
const semafor = require('semafor');

const log = semafor();

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const stripFlowType = () => {
  log.ok('Remove Flow type');
  execSync('yarn flow-remove-types src/ -d lib/');
};

const lunchBuild = () => {
  log.ok('Start Building');
  execSync('yarn config set @folio:registry https://repository.folio.org/repository/npm-folioci/');
  execSync('yarn global add @folio/stripes-cli');
  execSync('stripes build --output dist/ --sourcemap --languages en');
  log.ok('End Building for language en-US');
};

const run = () => {
  stripFlowType();
  lunchBuild();
};

run();
