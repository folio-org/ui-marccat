const cp = require('child_process');

const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const execSyncSilently = (cmd) => {
  execSync(cmd, { stdio: ['ignore', 'ignore', 'ignore'] });
};

const kill = (process) => { // eslint-disable-line no-unused-vars
  execSyncSilently(`pkill -f "${process}"`);
};

const clean = () => {
  execSync('stripes serve --lint config/stripes.config.js');
};

clean();
