import 'babel-polyfill';

// todo
const requireTest = require.context('./tests/', true, /-test/);
requireTest.keys().forEach(requireTest);
