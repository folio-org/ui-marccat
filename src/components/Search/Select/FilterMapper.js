const languageFilterMap = {
  'English': 'eng',
  'Italian': 'ita',
  'Spanish': 'spa',
  'French': 'fre',
  'Hungarian': 'hun',
  'Chinese simplified': 'chi',
  'Arabic': 'ara'
};

const formatFilterMap = {
  'All text': 'MAT "a"',
  'Books': '[(MAT "a" OR MAT "t") AND (BIB "m" OR BIB "c" OR BIB "d")]',
  'Archival Manuscript/ Mixed Formats': 'MAT "p"',
  'Film or Video': 'MAT "g"',
  'Map': 'MAT "e"',
  'Map(Manuscript)': 'MAT "f"',
  'Music Recording': 'MAT "j"',
  'Music Score': 'MAT "c"',
  'Music Score (Manuscript)': 'MAT "d"',
  'Nonmusic recording': 'MAT "i"',
  'Periodical or Serials': 'MAT "s"',
  'Photograph, Print, or Drawing': 'MAT "k"',
  'Rare Book or Manuscript': 'MAT "t"',
  'Software or E-Resource': 'MAT "m"',
  '3-D Object': 'MAT "r"'
};


const findYourQuery = {
  // FOR START KEY
  'ALL-START': 'AW ',
  'MULTI-START': 'AW ',
  'ISBN-START': 'BN ',
  'ISSN-START': 'SN ',
  'KEY-START': 'AW ',
  'NUMID-START': 'AN ',
  'NAME-START': 'NA ',
  'PUB-START': 'PU ',
  'LOC-START': 'LL ',
  'SUB-START': 'SU ',
  'TITLE-START': 'TI ',
  'BARCODE-START': 'BC ',
  'COPY-START': 'CP ',
  // FOR CONTAINS KEY
  'ALL-CONTAINS': 'AW ',
  'MULTI-CONTAINS': 'AW ',
  'ISBN-CONTAINS': 'AW ',
  'ISSN-CONTAINS': 'AW ',
  'KEY-CONTAINS': 'AW ',
  'NUMID-CONTAINS': 'AW ',
  'NAME-CONTAINS': 'NW ',
  'PUB-CONTAINS': 'PW ',
  'LOC-CONTAINS': 'AW ',
  'SUB-CONTAINS': 'SW ',
  'TITLE-CONTAINS': 'TW ',
  'BARCODE-CONTAINS': 'AW ',
  'COPY-CONTAINS': 'AW ',
  // FOR EXACT-MATCH  KEY
  'ALL-MATCH': 'AW ',
  'MULTI-MATCH': 'AW ',
  'ISBN-MATCH': 'BN ',
  'ISSN-MATCH': 'SN ',
  'KEY-MATCH': 'AW ',
  'NUMID-MATCH': 'AN ',
  'NAME-MATCH': 'NA ',
  'PUB-MATCH': 'PU ',
  'LOC-MATCH': 'LL ',
  'SUB-MATCH': 'SU ',
  'TITLE-MATCH': 'TI ',
  'BARCODE-MATCH': 'BC ',
  'COPY-MATCH': 'CP ',
};

export {
  findYourQuery,
  languageFilterMap,
  formatFilterMap
};

