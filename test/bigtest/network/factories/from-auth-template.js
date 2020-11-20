import { Factory } from 'miragejs';

export default Factory.extend({
  'id': 361,
  'canadianContentIndicator': '0',
  'verificationLevel': '1',
  'leader': {
    'code': '000',
    'value': '00215nz   2200097n  4500'
  },
  'fields': [
    {
      'code': '001',
      'mandatory': true,
      'fieldStatus': 'unchanged',
      'fixedField': {
        'keyNumber': 0,
        'categoryCode': 1,
        'headerTypeCode': 11,
        'code': '001',
        'displayValue': '00000000361',
        'sequenceNumber': 0,
        'attributes': {}
      },
      'added': false
    },
    {
      'code': '005',
      'mandatory': true,
      'fieldStatus': 'unchanged',
      'fixedField': {
        'categoryCode': 1,
        'description': '046 Special Coded Dates',
        'headerTypeCode': 12,
        'code': '005',
        'displayValue': '20201023103132.',
        'sequenceNumber': 0,
        'attributes': {}
      },
      'added': false
    },
    {
      'code': '008',
      'mandatory': true,
      'fieldStatus': 'unchanged',
      'fixedField': {
        'keyNumber': 0,
        'categoryCode': 1,
        'headerTypeCode': 10,
        'code': '008',
        'displayValue': '201023 n acanaaabn           n aaa     u',
        'dateEnteredOnFile': '201023',
        'sequenceNumber': 0,
        'attributes': {
          'dateEnteredOnFile': '201023'
        }
      },
      'added': false
    },
    {
      'code': '040',
      'mandatory': true,
      'fieldStatus': 'unchanged',
      'variableField': {
        'keyNumber': 0,
        'categoryCode': 1,
        'headingTypeCode': '1',
        'itemTypeCode': '-1',
        'functionCode': '-1',
        'ind1': ' ',
        'ind2': ' ',
        'code': '040',
        'displayValue':'\u001FaSCA\u001Fbeng',
        'subfields': [],
        'sequenceNumber': 0,
        'skipInFiling': 0
      },
      'added': false
    }
  ],
  'recordView': 0
});
