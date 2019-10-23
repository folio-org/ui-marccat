const webpack = require('webpack');

function mirage(config, enabled = false) {
  if (enabled) {
    console.info('Using Mirage Server'); // eslint-disable-line no-console
    return Object.assign({}, config, {
      entry: ['./test/bigtest/network/boot'].concat(config.entry)
    });
  } else {
    return config;
  }
}

const servePlugin = {
  // Standard yargs options object
  options: {
    'mirage [scenario]': {
      describe: 'Enable Mirage Server and specify a scenario',
      type: 'string',
      group: 'Mirage Server',
    },
  },
  // Stripes CLI hook into "webpackOverrides"
  beforeBuild: (options) => {
    const mirageOption = options.mirage === true ? 'default' : options.mirage;
    return (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin({
        MIRAGE_SCENARIO: mirageOption || 'default'
      }));
      return mirage(config, mirageOption);
    };
  },
};
module.exports = {
  okapi: { url: 'http://localhost:9130', tenant: 'diku' },
  // okapi: { url: 'http://okapi.atcult.it:9130', tenant: 'diku' },
  config: {
    logCategories: 'redux',
    hasAllPerms: true,
    // Custom command extension
    plugins: {
      serve: servePlugin
    }
  },
  branding: {
    logo: {
      src: './icons/app.png',
      alt: 'MARCcat',
    }
  },
};
