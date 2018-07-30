const cp = require('child_process');
const semafor = require('semafor');

const log = semafor();

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const lunchBuild = () => {
  log.ok('Start MARCcat Folio Module ....');
  execSync('stripes serve config/stripes.config.js');
};

lunchBuild();
