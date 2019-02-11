const cp = require('child_process');


const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const lunchBuild = () => {
  execSync('stripes build --output dist/');
};

const run = () => {
  lunchBuild();
};

run();
