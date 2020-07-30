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

this.get('/marccat/bibliographic-record/from-template/1', {
  "id":375,
  "canadianContentIndicator":"0",
  "verificationLevel":"2",
  "leader":{
    "code":"000",
    "value":"00000nam  2200000   4500"
  },
  "fields":[
    {
        "code":"001",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "fixedField":{
          "keyNumber":0,
          "categoryCode":1,
          "headerTypeCode":39,
          "code":"001",
          "displayValue":"00000000375",
          "sequenceNumber":0,
          "attributes":{

          }
        },
        "added":false
    },
    {
        "code":"005",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "fixedField":{
          "categoryCode":1,
          "description":"005 - Transaction Date/Time",
          "headerTypeCode":41,
          "code":"005",
          "displayValue":"20200708202030.",
          "sequenceNumber":0,
          "attributes":{

          }
        },
        "added":false
    },
    {
        "code":"008",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "fixedField":{
          "keyNumber":285348,
          "categoryCode":1,
          "headerTypeCode":31,
          "code":"008",
          "displayValue":"200708s1971    it     e      000 0 ita c",
          "dateEnteredOnFile":"200708",
          "sequenceNumber":0,
          "attributes":{
              "dateEnteredOnFile":"200708"
          }
        },
        "added":false
    },
    {
        "code":"040",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "variableField":{
          "keyNumber":0,
          "categoryCode":1,
          "headingTypeCode":"1",
          "itemTypeCode":"-1",
          "functionCode":"-1",
          "ind1":" ",
          "ind2":" ",
          "code":"040",
          "displayValue":"\u001FaItFiC",
          "subfields":[

          ],
          "sequenceNumber":0,
          "skipInFiling":0
        },
        "added":false
    }
  ],
  "recordView":0
});

this.get('/marccat/mergedSearch', ({mergedSearches}) => {
  return mergedSearches.all();
});

this.get('/marccat/countSearch', () => 2);

// translation bundle passthrough
this.pretender.get(`${__webpack_public_path__}translations/:rand.json`, this.pretender.passthrough); // eslint-disable-line

// hot-reload passthrough
this.pretender.get('/:rand.hot-update.json', this.pretender.passthrough);

}