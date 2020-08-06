module.exports = (config) => {
  const testIndex = './test/bigtest/index.js';
  const preprocessors = {};
  preprocessors[`${testIndex}`] = ['webpack'];

  const configuration = {
    files: [
      { pattern: testIndex, watched: false },
    ],

    preprocessors
  };

  // Set output directory for junit reporter
  if (config.junitReporter) {
    configuration.junitReporter = {
      outputDir: 'artifacts/junit/Karma'
    };
  }

  config.set(configuration);
};