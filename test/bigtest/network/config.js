import { okapi } from 'stripes-config'; // eslint-disable-line
import { Response } from '@bigtest/mirage';

// typical mirage config export
export default function configure() {
  this.urlPrefix = okapi.url;

  // okapi endpoints
  this.get('/_/version', () => '0.0.0');

  this.get('_/proxy/tenants/:id/modules', []);

  this.get('/saml/check', {
    ssoEnabled: false
  });

  this.get('/configurations/entries', {
    configs: []
  });

  this.post('/bl-users/login', () => {
    return new Response(201, {
      'X-Okapi-Token': `myOkapiToken:${Date.now()}`
    }, {
      user: {
        username: 'testuser',
        personal: {
          lastName: 'User',
          firstName: 'Test',
          email: 'user@folio.org',
        }
      },
      permissions: {
        permissions: []
      }
    });
  });

  this.get('/marccat/bibliographic-record/from-template/1', ({ fromTemplates }) => {
    return fromTemplates.all();
  });

  this.get('/marccat/mergedSearch', ({mergedSearches}) => {
    return mergedSearches.all();
  });

  this.get('/marccat/search', ({ bibSearches }) => {
    return bibSearches.all();
  });

  this.get('/marccat/searchAuth', ({ authoritySearches }) => {
    return authoritySearches.all();
  });

  this.get('/marccat/countSearch', () => 2);

  this.get('/marccat/browse', ({ browseSearches }) => {
    return browseSearches.all();
  });

  this.get('/marccatbibliographic-record/000000000022', ({ bibRecordDetails }) => {
    return bibRecordDetails.all();
  });

  this.get('/marccat/searchVertical', ({ verticalDetails }) => {
    return verticalDetails.all();
  });

  // Delete record
  this.delete('/marccat/bibliographic-record/:id', () => {
    return new Response(204, {}, '');
  });

  // translation bundle passthrough
  this.pretender.get(`${__webpack_public_path__}translations/:rand.json`, this.pretender.passthrough); // eslint-disable-line

  // hot-reload passthrough
  this.pretender.get('/:rand.hot-update.json', this.pretender.passthrough);
}
