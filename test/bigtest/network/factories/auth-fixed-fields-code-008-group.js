import { Factory } from 'miragejs';

export default Factory.extend({
  'headerTypeCode':10,
  'results': {
    'enteredOnFileDate': {
      'name': 'enteredOnFileDate',
      'defaultValue': '    ',
      'dropdownSelect': []
    },
    'subjectDescriptor': {
      'name': 'subjectDescriptor',
      'defaultValue': '|',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'Not subdivided geographically'
        },
        {
          'value': 'd',
          'label': 'Direct'
        },
        {
          'value': 'i',
          'label': 'Indirect'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'romanizationScheme': {
      'name': 'romanizationScheme',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'International Standard'
        },
        {
          'value': 'b',
          'label': 'National Standard'
        },
        {
          'value': 'c',
          'label': 'Nat Lib assoc standard'
        },
        {
          'value': 'd',
          'label': 'National Library Standard'
        },
        {
          'value': 'e',
          'label': 'Local Standard'
        },
        {
          'value': 'f',
          'label': 'Unknown'
        },
        {
          'value': 'g',
          'label': 'Conv name in lang of cat'
        },
        {
          'value': 'n',
          'label': ' Not applicable '
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'bilingualUsage': {
      'name': 'bilingualUsage',
      'defaultValue': ' ',
      'dropdownSelect':[
        {
          'value': ' ',
          'label': 'No information provided'
        },
        {
          'value': 'b',
          'label': 'English and French'
        },
        {
          'value': 'e',
          'label': 'English only'
        },
        {
          'value': 'f',
          'label': 'French only'
        },
        {
          'value': 'g',
          'label': 'Valid in English, Validity in French undetermined (OBSOLETE)'
        },
        {
          'value': 'h',
          'label': 'Valid in French, Validity in English undetermined (OBSOLETE)'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'recordType': {
      'name': 'recordType',
      'defaultValue': 'a',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Authorized heading record'
        },
        {
          'value': 'b',
          'label': 'Untraced reference record'
        },
        {
          'value': 'c',
          'label': 'Traced reference record'
        },
        {
          'value': 'd',
          'label': 'Subdivision record'
        },
        {
          'value': 'e',
          'label': 'Node label record'
        },
        {
          'value': 'f',
          'label': 'Auth. heading/subdivision'
        },
        {
          'value': 'g',
          'label': 'Ref/subdivision record'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'cataloguingRules': {
      'name': 'cataloguingRules',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Earlier rules'
        },
        {
          'value': 'b',
          'label': 'AACR1'
        },
        {
          'value': 'c',
          'label': 'AACR2'
        },
        {
          'value': 'd',
          'label': 'AACR2 Compatible'
        },
        {
          'value': 'e',
          'label': 'Non-AACR2 form (OBSOLETE)'
        },
        {
          'value': 'f',
          'label': 'Anglo-American cat rules, British edition (OBSOLETE)'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': 'u',
          'label': 'Unknown (OBSOLETE)'
        },
        {
          'value': 'x',
          'label': 'No specific rules (OBSOLETE)'
        },
        {
          'value': 'z',
          'label': 'Other'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'subjectSystem': {
      'name': 'subjectSystem',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Library of Congress'
        },
        {
          'value': 'b',
          'label': "LC Children's Literature"
        },
        {
          'value': 'c',
          'label': 'US Nat Lib of Medicine(MESH)'
        },
        {
          'value': 'd',
          'label': 'National agriculture Lib sbjct authority file'
        },
        {
          'value': 'h',
          'label': 'Hennepin County Lib Subjct Hdgs (OBSOLETE)'
        },
        {
          'value': 'k',
          'label': 'Canadian'
        },
        {
          'value': 'l',
          'label': 'Library of Congres (OBSOLETE)'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': 'r',
          'label': 'Arts and Arch Thesaurus'
        },
        {
          'value': 's',
          'label': 'Sears List'
        },
        {
          'value': 't',
          'label': 'Canadian Supplement to Sears List of sbjct hdgs (OBSOLETE)'
        },
        {
          'value': 'v',
          'label': 'Rep de vedettes-matiere'
        },
        {
          'value': 'z',
          'label': 'Other'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'seriesType': {
      'name': 'seriesType',
      'defaultValue': '',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Monographic series'
        },
        {
          'value': 'b',
          'label': 'Multipart item'
        },
        {
          'value': 'c',
          'label': 'Series-like phrase'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': 'z',
          'label': 'Other'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'seriesNumbering': {
      'name': 'seriesNumbering',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Numbered series'
        },
        {
          'value': 'b',
          'label': 'Unnumbered series'
        },
        {
          'value': 'c',
          'label': 'Numbering varies-640/641'
        },
        {
          'value': 'n',
          'label': 'Not applicable(not series)'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'mainAddedEntryIndicator': {
      'name': 'mainAddedEntryIndicator',
      'defaultValue': '|',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Appropriate '
        },
        {
          'value': 'b',
          'label': 'Not appropriate '
        },
        {
          'value': '|',
          'label': 'No attempt to code '
        }
      ]
    },
    'subjectEntryIndicator': {
      'name': 'subjectEntryIndicator',
      'defaultValue': '|',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Appropriate '
        },
        {
          'value': 'b',
          'label': 'Not appropriate'
        },
        {
          'value': '|',
          'label': 'No attempt to code '
        }
      ]
    },
    'seriesEntryIndicator': {
      'name': 'seriesEntryIndicator',
      'defaultValue': '|',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Appropriate '
        },
        {
          'value': 'b',
          'label': 'Not appropriate'
        },
        {
          'value': '|',
          'label': 'No attempt to code '
        }
      ]
    },
    'subDivisionType': {
      'name': 'subDivisionType',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'Value pre def of c.p.(OBS)'
        },
        {
          'value': 'a',
          'label': 'Topical subdivision'
        },
        {
          'value': 'b',
          'label': 'Form subdivision'
        },
        {
          'value': 'c',
          'label': 'Period subdivision'
        },
        {
          'value': 'd',
          'label': 'Place subdivision'
        },
        {
          'value': 'e',
          'label': 'Language subdivision'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'governmentAgency': {
      'name': 'governmentAgency',
      'defaultValue': ' ',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'Not a govt agency'
        },
        {
          'value': 'a',
          'label': 'Autonomous or semi-autonomous components of Malaysia'
        },
        {
          'value': 'c',
          'label': 'Multilocal'
        },
        {
          'value': 'f',
          'label': 'Federal/national'
        },
        {
          'value': 'i',
          'label': 'International intergovernmental'
        },
        {
          'value': 'l',
          'label': 'Local jurisdiction'
        },
        {
          'value': 'm',
          'label': 'Multistate'
        },
        {
          'value': 'o',
          'label': 'Government agency - type undetermined'
        },
        {
          'value': 'p',
          'label': 'Multijurisd(fed/prov)'
        },
        {
          'value': 'q',
          'label': 'Multijurisd(prov/local)'
        },
        {
          'value': 's',
          'label': 'State,Provincial,territorial,dependent,etc.'
        },
        {
          'value': 'u',
          'label': 'Unknown'
        },
        {
          'value': 'z',
          'label': 'Other'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'referenceStatus': {
      'name': 'referenceStatus',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'Value used in record (OBS)'
        },
        {
          'value': 'a',
          'label': 'Reference evaluated'
        },
        {
          'value': 'b',
          'label': 'Ref not evaluated'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'recordRevision': {
      'name': 'recordRevision',
      'defaultValue': '|',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Record can be used'
        },
        {
          'value': 'b',
          'label': 'Record not usable'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'nonUniqueName': {
      'name': 'nonUniqueName',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Unique name'
        },
        {
          'value': 'b',
          'label': 'Nonunique name'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'headingStatus': {
      'name': 'headingStatus',
      'defaultValue': 'n',
      'dropdownSelect': [
        {
          'value': 'a',
          'label': 'Fully establ heading'
        },
        {
          'value': 'b',
          'label': 'Memorandum'
        },
        {
          'value': 'c',
          'label': 'Provisional'
        },
        {
          'value': 'd',
          'label': 'Preliminary'
        },
        {
          'value': 'n',
          'label': 'Not applicable'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'recordModification': {
      'name': 'recordModification',
      'defaultValue': ' ',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'Record not modified'
        },
        {
          'value': 's',
          'label': 'Record shortened'
        },
        {
          'value': 'x',
          'label': 'Characters not input'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    },
    'cataloguingSourceCode': {
      'name': 'cataloguingSourceCode',
      'defaultValue': 'u',
      'dropdownSelect': [
        {
          'value': ' ',
          'label': 'National bibliographic agency'
        },
        {
          'value': 'c',
          'label': 'Co-operative cataloguing programmes'
        },
        {
          'value': 'd',
          'label': 'Other sources'
        },
        {
          'value': 'u',
          'label': 'Unknown'
        },
        {
          'value': '|',
          'label': 'No attempt to code'
        }
      ]
    }
  }
});
