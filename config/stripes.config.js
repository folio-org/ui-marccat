const environment = process.env.NODE_ENV;
const url = (environment === 'sandbox') ?
  'http://folio.atcult.it' :
  'http://localhost:9130';

module.exports = {
  okapi: { url, tenant: 'diku' },
  config: {
    logCategorie: '',
    hasAllPerms: true,
  },
  branding: {
    logo: {
      src: './icons/app.png',
      alt: 'MARCcat',
    }
  },
};
