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

  // FOR marccat/bibliographic-record/...
  this.get('/marccat/bibliographic-record/from-template/1', ({ fromTemplates }) => {
    return fromTemplates.all();
  });

  this.options('/marccat/bibliographic-record/fixed-field-display-value', () => {
    return new Response(200);
  });

  this.post('/marccat/bibliographic-record/fixed-field-display-value', ({ fixedFieldDisplayValues }) => {
    return fixedFieldDisplayValues.all();
    // return new Response(201);
  }, 201);

  // FOR marccat/authority-record/...
  this.get('/marccat/authority-record/from-template/1', ({ fromAuthTemplates }) => {
    return fromAuthTemplates.all();
  });

  this.options('/marccat/authority-record/fixed-field-display-value', () => {
    return new Response(200);
  });

  this.post('/marccat/authority-record/fixed-field-display-value', ({ authFixedFieldDisplayValues }) => {
    return authFixedFieldDisplayValues.all();
    // return new Response(201);
  }, 201);

  // FOR searchs...
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

  // For headerTypes
  this.get('/marccat/header-types', ({ headerTypes, header007Types, header008Types }, request) => {
    const code = request.queryParams.code;
    if (code === '008') {
      return header008Types.all();
    } else if (code === '007') {
      return header007Types.all();
    } else {
      return headerTypes.all();
    }
  });

  this.options('/marccat/header-types', () => {
    return new Response(200);
  });

  // For authHeaderTypes
  this.get('/marccat/auth-header-types', ({ authHeader008Types }, request) => {
    const code = request.queryParams.code;
    if (code === '008') {
      return authHeader008Types.all();
    }
  });

  this.options('/marccat/auth-header-types', () => {
    return new Response(200);
  });

  // For fixedFieldsCodeGroups
  this.get('/marccat/fixed-fields-code-groups', ({ fixedFieldsCodeGroups, fixedFieldsCode31Groups }, request) => {
    const code = request.queryParams.code;
    const headerTypeCode = request.queryParams.headerTypeCode;
    if (code === '008' && headerTypeCode === '31') {
      return fixedFieldsCode31Groups.all();
    } else { // code 000
      return fixedFieldsCodeGroups.all();
    }
  });

  this.options('/marccat/fixed-fields-code-groups', () => {
    return new Response(200);
  });

  // For authFixedFieldsCodeGroups
  this.get('/marccat/auth-fixed-fields-code-groups', ({ authFixedFieldsCodeGroups, authFixedFieldsCode008Groups }, request) => {
    const code = request.queryParams.code;
    const headerTypeCode = request.queryParams.headerTypeCode;
    if (code === '008' && headerTypeCode === '10') {
      return authFixedFieldsCode008Groups.all();
    } else { // code 000
      return authFixedFieldsCodeGroups.all();
    }
  });

  this.options('/marccat/auth-fixed-fields-code-groups', () => {
    return new Response(200);
  });

  // For fixedFieldsCodeGroupsByLeader
  this.get('/marccat/fixed-fields-code-groups-by-leader', ({ fixedFieldsCodeGroupsByLeaders }) => {
    return fixedFieldsCodeGroupsByLeaders.all();
  });

  this.options('/marccat/fixed-fields-code-groups-by-leader', () => {
    return new Response(200);
  });

  // For filteredTagsList
  this.options('/marccat/marccat/filteredTagsList', () => {
    return new Response(204);
  });

  this.get('/marccat/filteredTagsList', ({ filterTagsListsValues }) => {
    return filterTagsListsValues.all();
  });

  // For filteredTag
  this.options('/marccat/marccat/filteredTag', () => {
    return new Response(204);
  });

  this.get('/marccat/filteredTag', ({ filterTagValues }) => {
    return filterTagValues.all();
  });

  // For createHeading
  this.options('/marccat/create-heading', () => {
    return new Response(204);
  });

  this.post('/marccat/create-heading', ({ createHeadingValues }) => {
    return createHeadingValues.all();
  }, 201);

  // FOR createBibRecord
  this.post('/marccat/bibliographic-record', ({ createBibRecordValues }) => {
    return createBibRecordValues.all();
  }, 201);

  this.options('/marccat/bibliographic-record', () => {
    return new Response(204);
  });

  // FOR createAuthRecord
  this.post('/marccat/authority-record', ({ createAuthRecordValues }) => {
    return createAuthRecordValues.all();
  }, 201);

  this.options('/marccat/authority-record', () => {
    return new Response(204);
  });

  // translation bundle passthrough
  this.pretender.get(`${__webpack_public_path__}translations/:rand.json`, this.pretender.passthrough); // eslint-disable-line

  // hot-reload passthrough
  this.pretender.get('/:rand.hot-update.json', this.pretender.passthrough);
}
