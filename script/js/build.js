const cp = require('child_process');


const execSync = (cmd) => {
  cp.execSync(cmd, { stdio: ['inherit', 'inherit', 'inherit'] });
};

const lunchBuild = () => {
  execSync('yarn config set @folio:registry https://repository.folio.org/repository/npm-folioci/');
  execSync('yarn global add @folio/stripes-cli');
  execSync('stripes build --output dist/ --sourcemap --languages en');
};

const run = () => {
  lunchBuild();
};

run();
