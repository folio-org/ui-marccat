import { okapi } from 'stripes-config'; // eslint-disable-line
import { Response } from '@bigtest/mirage';
//import CQLParser, { CQLBoolean } from './cql';

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

  this.get('/notify/_self', {
    notifications: [],
    totalRecords: 0
  });

  this.get('/notify', {
    notifications: [],
    totalRecords: 0
  });

  // item-storage
  this.get('/service-points', {});

  this.put('/circulation/loans/:id', (_, request) => {
    return JSON.parse(request.requestBody);
  });

  this.get('/holdings-storage/holdings', {
    holdingsRecords: [],
    totalRecords: 0
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

  this.get('/marccat/mergedSearch', [
    {
      "searchingView":-1,
      "displayQuery":"TW \"1\"",
      "from":1,
      "to":1,
      "numFound":0,
      "docs":[

      ]
    },
    {
      "searchingView":1,
      "displayQuery":"TW \"1\"",
      "from":1,
      "to":10,
      "numFound":9,
      "docs":[
          {
            "recordView":1,
            "countDoc":0,
            "queryForAssociatedDoc":null,
            "tagHighlighted":"005, 008, 013, 020, 040, 082, 100, 245, 260, 300, 490, 520, 520, 520, 700, 700",
            "recordId":35,
            "data":{
                "leader":"00000nam a22000007i 4500",
                "fields":[
                  {
                      "001":"000000000035"
                  },
                  {
                      "005":"20180116203446.0"
                  },
                  {
                      "008":"180116s2017    it a          000 0 ita d"
                  },
                  {
                      "013":{
                        "subfields":[
                            {
                              "a":"it 50978793"
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "020":{
                        "subfields":[
                            {
                              "a":"9788862761611"
                            },
                            {
                              "c":"16.00 EUR"
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "040":{
                        "subfields":[
                            {
                              "a":"ItFiC"
                            },
                            {
                              "b":"eng"
                            },
                            {
                              "c":"ItFiC"
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "082":{
                        "subfields":[
                            {
                              "a":"790"
                            },
                            {
                              "2":"14"
                            }
                        ],
                        "ind1":"1",
                        "ind2":"4"
                      }
                  },
                  {
                      "100":{
                        "subfields":[
                            {
                              "a":"Mongini, Giovanni."
                            }
                        ],
                        "ind1":"1",
                        "ind2":" "
                      }
                  },
                  {
                      "245":{
                        "subfields":[
                            {
                              "a":"La fantascienza su Internet. Vol. 1: A-K."
                            }
                        ],
                        "ind1":"1",
                        "ind2":"3"
                      }
                  },
                  {
                      "260":{
                        "subfields":[
                            {
                              "a":"[S.l.] :"
                            },
                            {
                              "b":"Edizioni della Vigna,"
                            },
                            {
                              "c":"2017."
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "300":{
                        "subfields":[
                            {
                              "a":"350 p. :"
                            },
                            {
                              "b":"ill., br."
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "490":{
                        "subfields":[
                            {
                              "a":"Assaggi"
                            }
                        ],
                        "ind1":"0",
                        "ind2":" "
                      }
                  },
                  {
                      "520":{
                        "subfields":[
                            {
                              "a":"Da alcuni anni la possibilità "
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "520":{
                        "subfields":[
                            {
                              "a":"1."
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "520":{
                        "subfields":[
                            {
                              "a":"A-K."
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "700":{
                        "subfields":[
                            {
                              "a":"Mongini, C."
                            }
                        ],
                        "ind1":"1",
                        "ind2":" "
                      }
                  },
                  {
                      "700":{
                        "subfields":[
                            {
                              "a":"Menci, Manuela."
                            }
                        ],
                        "ind1":"1",
                        "ind2":" "
                      }
                  }
                ]
            }
          },
          {
            "recordView":1,
            "countDoc":0,
            "queryForAssociatedDoc":null,
            "tagHighlighted":"005, 008, 013, 020, 040, 245, 260",
            "recordId":79,
            "data":{
                "leader":"00000nam a22000003i 4500",
                "fields":[
                  {
                      "001":"000000000079"
                  },
                  {
                      "005":"20191219000000.0"
                  },
                  {
                      "008":"191219s2018    it            000 0 ita d"
                  },
                  {
                      "013":{
                        "subfields":[
                            {
                              "a":"it 19813831"
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "020":{
                        "subfields":[
                            {
                              "a":"9788497789981"
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "040":{
                        "subfields":[
                            {
                              "a":"ItFiC"
                            },
                            {
                              "b":"eng"
                            },
                            {
                              "c":"ItFiC"
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  },
                  {
                      "245":{
                        "subfields":[
                            {
                              "a":"Turismo 1, A1-A2, Libro del alumno."
                            }
                        ],
                        "ind1":"0",
                        "ind2":"0"
                      }
                  },
                  {
                      "260":{
                        "subfields":[
                            {
                              "a":"Madrid :"
                            },
                            {
                              "b":"SGEL,"
                            },
                            {
                              "c":"2018."
                            }
                        ],
                        "ind1":" ",
                        "ind2":" "
                      }
                  }
                ]
            }
          }
      ]
    }
  ]);

  this.get('/marccat/countSearch', () => 2);

  // translation bundle passthrough
  this.pretender.get(`${__webpack_public_path__}translations/:rand.json`, this.pretender.passthrough); // eslint-disable-line

  // hot-reload passthrough
  this.pretender.get('/:rand.hot-update.json', this.pretender.passthrough);
}