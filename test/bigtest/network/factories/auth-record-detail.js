import { Factory } from 'miragejs';

export default Factory.extend({
  'authorityRecord':{
    'id':24,
    'canadianContentIndicator':'0',
    'verificationLevel':'2',
    'leader':{
      'code':'000',
      'value':'00000nam  2200000   4500'
    },
    'fields':[
      {
        'code':'001',
        'mandatory':true,
        'fieldStatus':'unchanged',
        'fixedField':{
          'keyNumber':0,
          'categoryCode':1,
          'headerTypeCode':39,
          'code':'001',
          'displayValue':'000000000022',
          'sequenceNumber':0,
          'attributes':{

          }
        },
        'added':false
      },
      {
        'code':'005',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'fixedField':{
          'keyNumber':0,
          'categoryCode':1,
          'headerTypeCode':41,
          'code':'005',
          'displayValue':'20200616161847.9',
          'sequenceNumber':0,
          'attributes':{

          }
        },
        'added':false
      },
      {
        'code':'008',
        'mandatory':true,
        'fieldStatus':'changed',
        'fixedField':{
          'attributes':{
            'subjectDescriptor':' ',
            'romanizationScheme':'n',
            'bilingualUsage':' ',
            'recordType':'a',
            'cataloguingRules':'c',
            'subjectSystem':'a',
            'seriesType':'n',
            'seriesNumbering':'a',
            'mainAddedEntryIndicator':'a',
            'subjectEntryIndicator':'a',
            'seriesEntryIndicator':'b',
            'subDivisionType':'n',
            'governmentAgency':' ',
            'referenceStatus':'n',
            'recordRevision':'a',
            'nonUniqueName':'a',
            'headingStatus':'a',
            'recordModification':' ',
            'cataloguingSourceCode':'u'
          },
          'sequenceNumber':0,
          'cataloguingSourceCode':'u',
          'recordModification':' ',
          'headingStatus':'a',
          'nonUniqueName':'a',
          'recordRevision':'a',
          'referenceStatus':'n',
          'governmentAgency':' ',
          'subDivisionType':'n',
          'seriesEntryIndicator':'b',
          'subjectEntryIndicator':'a',
          'mainAddedEntryIndicator':'a',
          'seriesNumbering':'a',
          'seriesType':'n',
          'subjectSystem':'a',
          'cataloguingRules':'c',
          'recordType':'a',
          'bilingualUsage':' ',
          'romanizationScheme':'n',
          'subjectDescriptor':' ',
          'dateEnteredOnFile':'201027',
          'displayValue':'201027 n acanaaabn           n aaa     u',
          'code':'008',
          'headerTypeCode':10,
          'categoryCode':1,
          'id':'1'
        },
        'added':false
      },
      {
        'code':'040',
        'mandatory':true,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':0,
          'categoryCode':1,
          'headingTypeCode':'1',
          'itemTypeCode':'-1',
          'functionCode':'-1',
          'ind1':' ',
          'ind2':' ',
          'code':'040',
          'displayValue':'\u001faItFiC',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      },
      {
        'code':'100',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':105,
          'categoryCode':2,
          'headingTypeCode':'2',
          'itemTypeCode':'3',
          'functionCode':'2',
          'ind1':'1',
          'ind2':' ',
          'code':'100',
          'displayValue':'\u001faDi Sabato',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      },
      {
        'code':'245',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':121,
          'categoryCode':3,
          'headingTypeCode':'1',
          'itemTypeCode':'3',
          'functionCode':'-1',
          'ind1':'1',
          'ind2':'0',
          'code':'245',
          'displayValue':'\u001faTest',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      },
      {
        'code':'250',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':555,
          'categoryCode':7,
          'headingTypeCode':'19',
          'itemTypeCode':'-1',
          'functionCode':'-1',
          'ind1':' ',
          'ind2':' ',
          'code':'250',
          'displayValue':'\u001faSeconda edizione',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      },
      {
        'code':'264',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':87,
          'categoryCode':7,
          'headingTypeCode':'411',
          'itemTypeCode':'-1',
          'functionCode':'-1',
          'ind1':' ',
          'ind2':'1',
          'code':'264',
          'displayValue':'\u001faGenova : ;\u001faRoma :\u001fbDER,\u001fc2019.',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      },
      {
        'code':'300',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':556,
          'categoryCode':7,
          'headingTypeCode':'35',
          'itemTypeCode':'-1',
          'functionCode':'-1',
          'ind1':' ',
          'ind2':' ',
          'code':'300',
          'displayValue':'\u001fa24 pagine',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      },
      {
        'code':'500',
        'mandatory':false,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':557,
          'categoryCode':7,
          'headingTypeCode':'50',
          'itemTypeCode':'-1',
          'functionCode':'-1',
          'ind1':' ',
          'ind2':' ',
          'code':'500',
          'displayValue':'\u001faTest tag nota',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      }
    ],
    'recordView':1
  },
  'recordTemplate':{
    'id':1,
    'fields':[
      {
        'code':'001',
        'mandatory':true,
        'fieldStatus':'unchanged',
        'fixedField':{
          'keyNumber':0,
          'categoryCode':1,
          'headerTypeCode':11,
          'code':'001',
          'displayValue':'00000000361',
          'sequenceNumber':0,
          'attributes':{

          }
        },
        'added':false
      },
      {
        'code':'005',
        'mandatory':true,
        'fieldStatus':'unchanged',
        'fixedField':{
          'categoryCode':1,
          'description':'046 Special Coded Dates',
          'headerTypeCode':12,
          'code':'005',
          'displayValue':'20201023103132.',
          'sequenceNumber':0,
          'attributes':{

          }
        },
        'added':false
      },
      {
        'code':'008',
        'mandatory':true,
        'fieldStatus':'changed',
        'fixedField':{
          'attributes':{
            'subjectDescriptor':' ',
            'romanizationScheme':'n',
            'bilingualUsage':' ',
            'recordType':'a',
            'cataloguingRules':'c',
            'subjectSystem':'a',
            'seriesType':'n',
            'seriesNumbering':'a',
            'mainAddedEntryIndicator':'a',
            'subjectEntryIndicator':'a',
            'seriesEntryIndicator':'b',
            'subDivisionType':'n',
            'governmentAgency':' ',
            'referenceStatus':'n',
            'recordRevision':'a',
            'nonUniqueName':'a',
            'headingStatus':'a',
            'recordModification':' ',
            'cataloguingSourceCode':'u'
          },
          'sequenceNumber':0,
          'cataloguingSourceCode':'u',
          'recordModification':' ',
          'headingStatus':'a',
          'nonUniqueName':'a',
          'recordRevision':'a',
          'referenceStatus':'n',
          'governmentAgency':' ',
          'subDivisionType':'n',
          'seriesEntryIndicator':'b',
          'subjectEntryIndicator':'a',
          'mainAddedEntryIndicator':'a',
          'seriesNumbering':'a',
          'seriesType':'n',
          'subjectSystem':'a',
          'cataloguingRules':'c',
          'recordType':'a',
          'bilingualUsage':' ',
          'romanizationScheme':'n',
          'subjectDescriptor':' ',
          'dateEnteredOnFile':'201027',
          'displayValue':'201027 n acanaaabn           n aaa     u',
          'code':'008',
          'headerTypeCode':10,
          'categoryCode':1,
          'id':'1'
        },
        'added':false
      },
      {
        'code':'040',
        'mandatory':true,
        'fieldStatus':'unchanged',
        'variableField':{
          'keyNumber':0,
          'categoryCode':1,
          'headingTypeCode':'1',
          'itemTypeCode':'-1',
          'functionCode':'-1',
          'ind1':' ',
          'ind2':' ',
          'code':'040',
          'displayValue':'\u001faSCA\u001fbeng',
          'subfields':[

          ],
          'sequenceNumber':0,
          'skipInFiling':0
        },
        'added':false
      }
    ]
  }
});
