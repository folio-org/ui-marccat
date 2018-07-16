const environment = process.env.NODE_ENV;
let url;

if (environment === 'sandbox') {
  url = 'https://okapi-sandbox.frontside.io';
} else {
  url = 'http://192.168.0.28:9130';
}

module.exports = {
  okapi: { url, tenant: 'diku' },
  config: {
    autoLogin: {
      username: 'diku_admin',
      password: 'admin',
    },
    logCategories: 'core,path,mpath,mquery,xhr',
    logPrefix: 'marccat-stripes',
    logTimestamp: false,
    showPerms: true,
    showHomeLink: true,
    listInvisiblePerms: true,
    hasAllPerms: true,
    softLogout: true,
  },
  modules: {
    '@folio/marccat': {},
  },
};
