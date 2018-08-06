import 'babel-polyfill';

const __karma__ = {};

__karma__.loaded = function () {};

const context = require.context('./', true, /\.spec\.js$/);
context.keys().map(context);
__karma__.start();
