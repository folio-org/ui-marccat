const cp = require('child_process');

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const startDebug = () => {
  execSync('stripes serve --lint config/stripes.config.js');
};
startDebug();
