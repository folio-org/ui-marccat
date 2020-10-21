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

  this.options('marccat/bibliographic-record/fixed-field-display-value', () => {
    return new Response(200);
  });

  this.post('marccat/bibliographic-record/fixed-field-display-value', () => {
    return new Response(201);
  }, 201);

  this.get('/marccat/authority-record/from-template/1', ({ fromAuthTemplates }) => {
    return fromAuthTemplates.all();
  });

  this.get('/marccat/mergedSearch', ({ mergedSearches }) => {
    return mergedSearches.all();
  });

  this.get('/marccat/search', ({ bibSearches }) => {
    return bibSearches.all();
  });

  this.get('/marccat/searchAuth', ({ authoritySearches }) => {
    return authoritySearches.all();
  });

  this.get('/marccat/countSearch', () => 2);

  // Delete Bib record
  this.delete('/marccat/bibliographic-record/:id', () => {
    return new Response(204);
  }, 204);

  // Delete Auth record
  this.delete('/marccat/authority-record/:id', () => {
    return new Response(423, {}, {});
  }, 423);

  this.get('/marccat/browse', ({ browseSearches }) => {
    return browseSearches.all();
  });

  this.get('/marccat/bibliographic-record/:id', ({ bibRecordDetails }) => {
    return bibRecordDetails.all();
  });

  this.get('/marccat/searchVertical', ({ verticalDetails }) => {
    return verticalDetails.all();
  });

  this.get('/marccat/header-types', ({ headerTypes }) => {
    return headerTypes.all();
  });

  this.options('/marccat/header-types', () => {
    return new Response(200);
  });

  this.get('/marccat/fixed-fields-code-groups', ({ fixedFieldsCodeGroups }) => {
    return fixedFieldsCodeGroups.all();
  });

  this.options('/marccat/fixed-fields-code-groups', () => {
    return new Response(200);
  });

  this.get('/marccat/fixed-fields-code-groups-by-leader', ({ fixedFieldsCodeGroupsByLeaders }) => {
    return fixedFieldsCodeGroupsByLeaders.all();
  });

  this.options('/marccat/fixed-fields-code-groups-by-leader', () => {
    return new Response(200);
  });

  // translation bundle passthrough
  this.pretender.get(`${__webpack_public_path__}translations/:rand.json`, this.pretender.passthrough); // eslint-disable-line

  // hot-reload passthrough
  this.pretender.get('/:rand.hot-update.json', this.pretender.passthrough);
}
