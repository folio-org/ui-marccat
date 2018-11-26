import 'babel-polyfill';

const requireTest = require.context('./tests/', true, /-test/);
requireTest.keys().forEach(requireTest);
