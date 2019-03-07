const cp = require('child_process');


const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const lunchBuild = () => {
  execSync('stripes build --okapi http://folio-q4.aws.indexdata.com:9130 --output dist/');
};

const run = () => {
  lunchBuild();
};

run();
