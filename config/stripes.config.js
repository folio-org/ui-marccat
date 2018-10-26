const environment = process.env.NODE_ENV;
let url;

if (environment === 'sandbox') {
  url = 'https://okapi-sandbox.frontside.io';
} else {
  url = 'http://folio-alpha.aws.indexdata.com:9130';
}
module.exports = {
  okapi: { url, tenant: 'diku' },
  config: {
    autoLogin: {
      username: 'diku_admin',
      password: 'admin',
    },
    logCategories: 'redux',
    logPrefix: `@@MARCCAT-LOG[${environment}] -->`,
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
  branding: {
    logo: {
      src: './icons/app.png',
      alt: 'MARCcat',
    }
  },
};
