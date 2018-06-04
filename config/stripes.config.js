const environment = process.env.NODE_ENV;
let url;

if (environment === 'sandbox') {
  url = 'https://okapi-sandbox.frontside.io';
} else {
  url = 'http://192.168.0.28:9130';
}

module.exports = {
  // This could be set here or in a .stripesclirc file
  okapi: { url, tenant: 'diku' },
  config: {
    logCategories: 'core,redux,connect,connect-fetch,substitute,path,mpath,mquery,action,event,perm,interface,xhr',
    logPrefix: 'stripes',
    logTimestamp: true,
    showPerms: true,
    showHomeLink: true,
    listInvisiblePerms: true,
    hasAllPerms: true,
    softLogout: true
  },
  modules: {
    '@folio/cataloging': {},
  }
};
