import { Factory } from 'miragejs';

export default Factory.extend({
  'results':{
    'itemRecordStatusCode':{
      'name':'itemRecordStatusCode',
      'defaultValue':'n',
      'dropdownSelect':[
        {
          'value':'a',
          'label':'Increase in encoding level'
        },
        {
          'value':'c',
          'label':'Corrected or revised record'
        },
        {
          'value':'d',
          'label':'Deleted record'
        },
        {
          'value':'n',
          'label':'New record'
        },
        {
          'value':'p',
          'label':'Previously CIP record'
        }
      ]
    },
    'itemRecordTypeCode':{
      'name':'itemRecordTypeCode',
      'defaultValue':'a',
      'dropdownSelect':[
        {
          'value':'a',
          'label':'Language material'
        },
        {
          'value':'c',
          'label':'Music, printed or microform'
        },
        {
          'value':'d',
          'label':'Music, manuscript'
        },
        {
          'value':'e',
          'label':'Cartographic material, printed or microform'
        },
        {
          'value':'f',
          'label':'Cartographic material, manuscript (including microform)'
        },
        {
          'value':'g',
          'label':'Projected media'
        },
        {
          'value':'i',
          'label':'Sound recording, non-musical'
        },
        {
          'value':'j',
          'label':'Sound recording, musical'
        },
        {
          'value':'k',
          'label':'Two-dimensional non-projectable graphic representation'
        },
        {
          'value':'m',
          'label':'Computer file'
        },
        {
          'value':'o',
          'label':'Kit'
        },
        {
          'value':'p',
          'label':'Mixed material'
        },
        {
          'value':'r',
          'label':'Three-dimensional artifact'
        },
        {
          'value':'t',
          'label':'Manuscript language material (including microform)'
        }
      ]
    },
    'itemBibliographicLevelCode':{
      'name':'itemBibliographicLevelCode',
      'defaultValue':'m',
      'dropdownSelect':[
        {
          'value':'a',
          'label':'Component part, monographic'
        },
        {
          'value':'b',
          'label':'Component part, serial'
        },
        {
          'value':'c',
          'label':'Collection'
        },
        {
          'value':'d',
          'label':'Subunit'
        },
        {
          'value':'i',
          'label':'Integrating resource'
        },
        {
          'value':'m',
          'label':'Monograph'
        },
        {
          'value':'s',
          'label':'Serial'
        }
      ]
    },
    'itemControlTypeCode':{
      'name':'itemControlTypeCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'No specified type of control'
        },
        {
          'value':'a',
          'label':'Archival control'
        }
      ]
    },
    'characterCodingSchemeCode':{
      'name':'characterCodingSchemeCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'MARC-8'
        },
        {
          'value':'a',
          'label':'UCS/Unicode'
        }
      ]
    },
    'encodingLevel':{
      'name':'encodingLevel',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Full level with item'
        },
        {
          'value':'1',
          'label':'Full level without item'
        },
        {
          'value':'2',
          'label':'Less than full level'
        },
        {
          'value':'3',
          'label':'Abbreviated record'
        },
        {
          'value':'4',
          'label':'Core level'
        },
        {
          'value':'5',
          'label':'Partial record'
        },
        {
          'value':'7',
          'label':'Minimal level record'
        },
        {
          'value':'8',
          'label':'Prepublication level'
        },
        {
          'value':'u',
          'label':'Unknown'
        },
        {
          'value':'z',
          'label':'Not applicable'
        }
      ]
    },
    'descriptiveCataloguingCode':{
      'name':'descriptiveCataloguingCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Non-ISBD form (pre-AACR 1 rev.)'
        },
        {
          'value':'a',
          'label':'Full ISBD form (AACR 2)'
        },
        {
          'value':'c',
          'label':'ISBD punctuation omitted'
        },
        {
          'value':'i',
          'label':'ISBD punctuation included'
        },
        {
          'value':'u',
          'label':'Unknown'
        }
      ]
    },
    'linkedRecordCode':{
      'name':'linkedRecordCode',
      'defaultValue':' ',
      'dropdownSelect':[
        {
          'value':' ',
          'label':'Not specified or not applicable'
        },
        {
          'value':'a',
          'label':'Set'
        },
        {
          'value':'b',
          'label':'Part with independant title'
        },
        {
          'value':'c',
          'label':'Part with dependant title'
        }
      ]
    }
  }
});
