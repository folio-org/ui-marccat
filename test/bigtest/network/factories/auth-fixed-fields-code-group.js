import { Factory } from 'miragejs';

export default Factory.extend({
  'results': {
    'recordStatusCode': {
      'name': 'recordStatusCode',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Increase in Encoding Level'
        },
        {
          'value': 'c',
          'label': 'Corrected or revised record'
        },
        {
          'value': 'd',
          'label': 'Record deleted - replaced by another heading'
        },
        {
          'value': 'n',
          'label': 'New record'
        },
        {
          'value': 's',
          'label': 'Record deleted - replaced by two other headings'
        },
        {
          'value': 'x',
          'label': 'Record deleted - explanation in note'
        }
      ]
    },
    'characterCodingSchemeCode': {
      'name': 'characterCodingSchemeCode',
      'defaultValue': ' ',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'MARC-8'
        },
        {
          'value': 'a',
          'label': 'UCS/Unicode'
        }
      ]
    },
    'encodingLevel': {
      'name': 'encodingLevel',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'n',
          'label': 'Full level'
        },
        {
          'value': 'o',
          'label': 'Incomplete record'
        }
      ]
    }
  }
});
