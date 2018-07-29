const cp = require('child_process');
const semafor = require('semafor');

const log = semafor();

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const lunchBuild = () => {
  log.ok('Start Building');
  execSync('stripes build --output dist/ --sourcemap');
};

lunchBuild();
