const cp = require('child_process');
const os = require('os');

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const setDebugVariable = () => {
  return (os.platform() === 'win32') ?
    execSync('set DEBUG=stripes* stripes serve  --languages en config/stripes.config.js ') :
    execSync('DEBUG=stripes* stripes serve  --languages en config/stripes.config.js');
};

const startDebug = () => {
  setDebugVariable();
  execSync('stripes serve --lint config/stripes.config.js');
};

startDebug();
