import { Factory } from 'miragejs';

export default Factory.extend({
  'id':2,
  'canadianContentIndicator':'0',
  'verificationLevel':'1',
  'leader':{
    'code':'000',
    'value':'00215nz   2200097n  4500'
  },
  'fields':[
    {
      'code':'001',
      'mandatory':true,
      'fieldStatus':'unchanged',
      'fixedField':{
        'categoryCode':1,
        'headerTypeCode':39,
        'code':'001',
        'displayValue':'00000000100',
        'sequenceNumber':0,
        'attributes':{

        }
      },
      'added':true
    },
    {
      'code':'005',
      'mandatory':true,
      'fieldStatus':'unchanged',
      'fixedField':{
        'categoryCode':1,
        'description':'005 Data/hour of transaction',
        'headerTypeCode':41,
        'code':'005',
        'displayValue':'20200901111027.',
        'sequenceNumber':0,
        'attributes':{

        }
      },
      'added':false
    },
    {
      'code':'008',
      'mandatory':true,
      'fieldStatus':'unchanged',
      'fixedField':{
        'categoryCode':1,
        'headerTypeCode':31,
        'code':'008',
        'displayValue':'200729 n annnnabbn n2ann und u',
        'sequenceNumber':0,
        'attributes':{

        }
      },
      'added':true
    },
    {
      'code':'040',
      'mandatory':true,
      'fieldStatus':'unchanged',
      'variableField':{
        'categoryCode':1,
        'ind1':' ',
        'ind2':' ',
        'code':'040',
        'displayValue':'\u001faSCA\u001fbeng',
        'subfields':[

        ],
        'sequenceNumber':0,
        'skipInFiling':0
      },
      'added':true
    }
  ],
  'recordView':-1
});
