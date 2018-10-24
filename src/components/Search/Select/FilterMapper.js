const languageFilterMap = { 'English': 'eng',
  'Italian': 'ita',
  'Spanish': 'spa',
  'French': 'fre',
  'Hungarian': 'hun',
  'Chinese simplified': 'chi',
  'Arabic': 'ara' };


const findYourQuery = [
  // FOR START KEY
  { label: 'ALL-START', value: 'AW ' },
  { label: 'MULTI-START', value: 'AW ' },
  { label: 'ISBN-START', value: 'BN ' },
  { label: 'ISSN-START', value: 'SN ' },
  { label: 'KEY-START', value: 'AW ' },
  { label: 'NUMID-START', value: 'AN ' },
  { label: 'NAME-START', value: 'NA ' },
  { label: 'PUB-START', value: 'PU ' },
  { label: 'LOC-START', value: 'LL ' },
  { label: 'SUB-START', value: 'SU ' },
  { label: 'TITLE-START', value: 'TI ' },
  { label: 'BARCODE-START', value: 'BC ' },
  { label: 'COPY-START', value: 'CP ' },
  // FOR CONTAINS KEY
  { label: 'ALL-CONTAINS', value: 'AW ' },
  { label: 'MULTI-CONTAINS', value: 'AW ' },
  { label: 'ISBN-CONTAINS', value: 'AW ' },
  { label: 'ISSN-CONTAINS', value: 'AW ' },
  { label: 'KEY-CONTAINS', value: 'AW ' },
  { label: 'NUMID-CONTAINS', value: 'AW ' },
  { label: 'NAME-CONTAINS', value: 'NW ' },
  { label: 'PUB-CONTAINS', value: 'PW ' },
  { label: 'LOC-CONTAINS', value: 'AW ' },
  { label: 'SUB-CONTAINS', value: 'SW ' },
  { label: 'TITLE-CONTAINS', value: 'TW ' },
  { label: 'BARCODE-CONTAINS', value: 'AW ' },
  { label: 'COPY-CONTAINS', value: 'AW ' },
  // FOR EXACT-MATCH  KEY
  { label: 'ALL-MATCH', value: 'AW ' },
  { label: 'MULTI-MATCH', value: 'AW ' },
  { label: 'ISBN-MATCH', value: 'BN ' },
  { label: 'ISSN-MATCH', value: 'SN ' },
  { label: 'KEY-MATCH', value: 'AW ' },
  { label: 'NUMID-MATCH', value: 'AN ' },
  { label: 'NAME-MATCH', value: 'NA ' },
  { label: 'PUB-MATCH', value: 'PU ' },
  { label: 'LOC-MATCH', value: 'LL ' },
  { label: 'SUB-MATCH', value: 'SU ' },
  { label: 'TITLE-MATCH', value: 'TI ' },
  { label: 'BARCODE-MATCH', value: 'BC ' },
  { label: 'COPY-MATCH', value: 'CP ' },
];

export {
  findYourQuery,
  languageFilterMap
};

