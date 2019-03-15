const path = require('path');

module.exports = {
  getProjectRoots() {
    return [
      path.resolve(__dirname, './'),
      path.resolve(__dirname, './node_modules'),

      // Add the common root.
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../node_modules'),

      // Add shared.
      path.resolve(__dirname, '../shared'),
      path.resolve(__dirname, '../shared/node_modules'),
    ];
  },
};
