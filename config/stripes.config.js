const environment = process.env.NODE_ENV;
const url = (environment === 'sandbox') ?
  'http://folio.atcult.it' :
  'http://folio-alpha.aws.indexdata.com:9130';

module.exports = {
  okapi: { url, tenant: 'diku' },
  config: {
    logCategorie: 'redux',
    hasAllPerms: true,
  },
  branding: {
    logo: {
      src: './icons/app.png',
      alt: 'MARCcat',
    }
  },
};
