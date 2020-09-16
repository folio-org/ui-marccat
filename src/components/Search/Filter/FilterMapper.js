export const languageFilterMap = {
  'English': 'eng',
  'Italian': 'ita',
  'Spanish': 'spa',
  'French': 'fre',
  'Hungarian': 'hun',
  'Chinese simplified': 'chi',
  'Arabic': 'ara'
};
export const formatFilterMap = {
  'All text': 'MAT "a"',
  'Books': '((MAT "a" OR MAT "t") AND (BIB "m" OR BIB "c" OR BIB "d"))',
  'Archival Manuscript/ Mixed Formats': 'MAT "p"',
  'Film or Video': 'MAT "g"',
  'Map': 'MAT "e"',
  'Map(Manuscript)': 'MAT "f"',
  'Music Recording': 'MAT "j"',
  'Music Score': 'MAT "c"',
  'Music Score (Manuscript)': 'MAT "d"',
  'Nonmusic recording': 'MAT "i"',
  'Periodical or Serials': '(BIB "s" or BIB "b")',
  'Photograph, Print, or Drawing': 'MAT "k"',
  'Rare Book or Manuscript': 'MAT "t"',
  'Software or E-Resource': 'MAT "m"',
  '3-D Object': 'MAT "r"',
  'Microform': 'MIC "h"'
};
export const findYourQuery = {
  // FOR START KEY
  'TITLE-START': 'TI ',
  'NAME-START': 'NA ',
  'ISBN-START': 'BN ',
  'ISSN-START': 'SN ',
  'NUMID-START': 'AN ',
  'OTHID-START': 'NN',
  'ALL-START': 'AW ',
  'TITSER-START': 'TS ',
  'NAMEP-START': 'NP ',
  'NAMEC-START': 'NC ',
  'NAMEM-START': 'NM ',
  'NAMETN-START': 'NTN ',
  'NAMETT-START': 'NTT ',
  'SUB-START': 'SU ',
  'SUBP-START': 'SPN ',
  'SUBC-START': 'SCN ',
  'SUBM-START': 'SMN ',
  'SUBUT-START': 'SUT ',
  'SUBNE-START': 'SNE ',
  'SUBCT-START': 'SCT ',
  'SUBTT-START': 'STT ',
  'SUBGN-START': 'SGN ',
  'SUBU-START': 'SUN ',
  'SUBFTT-START': 'SFT ',
  'SUBFGF-START': 'SGN ',
  'SUBO-START': 'SOC ',
  'SUBF-START': 'SFU ',
  'SUBCO-START': 'SCO ',
  'SUBHPN-START': 'SHP ',
  'SUBL-START': 'SLO ',
  'PW-START': 'PU ',
  'PN-START': 'PU ',
  'PP-START': 'PP ',
  'CC-START': 'CC ',
  'OC-START': 'OC ',
  'ZC-START': 'ZC ',
  'SC-START': 'SC ',
  'DC-START': 'DC ',
  'LC-START': 'LC ',
  'MC-START': 'MC ',
  'LX-START': 'LX ',
  'CH-START': 'CH ',
  'UC-START': 'UC ',
  'CD-START': 'CD ',
  'MN-START': 'MN ',
  'LN-START': 'LN ',
  'MUSP-START': 'PN ',
  'NN-START': 'NN ',
  // FOR EXACT-MATCH  KEY
  'TITLE-MATCH': 'TI ',
  'NAME-MATCH': 'NA ',
  'ISBN-MATCH': 'BN ',
  'ISSN-MATCH': 'SN ',
  'NUMID-MATCH': 'AN ',
  'OTHID-MATCH': 'NN',
  'ALL-MATCH': 'AW ',
  'TITSER-MATCH': 'TS ',
  'NAMEP-MATCH': 'NP ',
  'NAMEC-MATCH': 'NC ',
  'NAMEM-MATCH': 'NM ',
  'NAMETN-MATCH': 'NTN ',
  'NAMETT-MATCH': 'NTT ',
  'SUB-MATCH': 'SU ',
  'SUBP-MATCH': 'SPN ',
  'SUBC-MATCH': 'SCN ',
  'SUBM-MATCH': 'SMN ',
  'SUBUT-MATCH': 'SUT ',
  'SUBNE-MATCH': 'SNE ',
  'SUBCT-MATCH': 'SCT ',
  'SUBTT-MATCH': 'STT ',
  'SUBGN-MATCH': 'SGN ',
  'SUBU-MATCH': 'SUN ',
  'SUBFTT-MATCH': 'SFT ',
  'SUBFGF-MATCH': 'SGN ',
  'SUBO-MATCH': 'SOC ',
  'SUBF-MATCH': 'SFU ',
  'SUBCO-MATCH': 'SCO ',
  'SUBHPN-MATCH': 'SHP ',
  'SUBL-MATCH': 'SLO ',
  'PN-MATCH': 'PU ',
  'PP-MATCH': 'PP ',
  'CC-MATCH': 'CC ',
  'OC-MATCH': 'OC ',
  'ZC-MATCH': 'ZC ',
  'SC-MATCH': 'SC ',
  'DC-MATCH': 'DC ',
  'LC-MATCH': 'LC ',
  'MC-MATCH': 'MC ',
  'LX-MATCH': 'LX ',
  'CH-MATCH': 'CH ',
  'UC-MATCH': 'UC ',
  'CD-MATCH': 'CD ',
  'MN-MATCH': 'MN ',
  'LN-MATCH': 'LN ',
  'MUSP-MATCH': 'PN ',
  'NN-MATCH': 'NN ',
  // FOR BROWSE KEY
  'TITLE-BROWSE': 'TI ',
  'NAME-BROWSE': 'NA ',
  'ISBN-BROWSE': 'BN ',
  'ISSN-BROWSE': 'SN ',
  'NUMID-BROWSE': 'AN ',
  'OTHID-BROWSE': 'NN',
  'ALL-BROWSE': 'AW ',
  'TITSER-BROWSE': 'TS ',
  'NAMEP-BROWSE': 'NP ',
  'NAMEC-BROWSE': 'NC ',
  'NAMEM-BROWSE': 'NM ',
  'NAMETN-BROWSE': 'NTN ',
  'NAMETT-BROWSE': 'NTT ',
  'SUB-BROWSE': 'SU ',
  'SUBP-BROWSE': 'SPN ',
  'SUBC-BROWSE': 'SCN ',
  'SUBM-BROWSE': 'SMN ',
  'SUBUT-BROWSE': 'SUT ',
  'SUBNE-BROWSE': 'SNE ',
  'SUBCT-BROWSE': 'SCT ',
  'SUBTT-BROWSE': 'STT ',
  'SUBGN-BROWSE': 'SGN ',
  'SUBU-BROWSE': 'SUN ',
  'SUBFTT-BROWSE': 'SFT ',
  'SUBFGF-BROWSE': 'SGN ',
  'SUBO-BROWSE': 'SOC ',
  'SUBF-BROWSE': 'SFU ',
  'SUBCO-BROWSE': 'SCO ',
  'SUBHPN-BROWSE': 'SHP ',
  'SUBL-BROWSE': 'SLO ',
  'PN-BROWSE': 'PU ',
  'PP-BROWSE': 'PP ',
  'CC-BROWSE': 'CC ',
  'OC-BROWSE': 'OC ',
  'ZC-BROWSE': 'ZC ',
  'SC-BROWSE': 'SC ',
  'DC-BROWSE': 'DC ',
  'LC-BROWSE': 'LC ',
  'MC-BROWSE': 'MC ',
  'LX-BROWSE': 'LX ',
  'CH-BROWSE': 'CH ',
  'UC-BROWSE': 'UC ',
  'CD-BROWSE': 'CD ',
  'MN-BROWSE': 'MN ',
  'LN-BROWSE': 'LN ',
  'MUSP-BROWSE': 'PN ',
  'NN-BROWSE': 'NN ',
  // FOR CONTAINS KEY
  'TITLE-CONTAINS': 'TW ',
  'NAME-CONTAINS': 'NW ',
  'ISBN-CONTAINS': 'AW ',
  'ISSN-CONTAINS': 'AW ',
  'NUMID-CONTAINS': 'AW ',
  'OTHID-CONTAINS': 'AW',
  'ALL-CONTAINS': 'AW ',
  'TITSER-CONTAINS': 'AW ',
  'NAMEP-CONTAINS': 'NW ',
  'NAMEC-CONTAINS': 'NW ',
  'NAMEM-CONTAINS': 'NW ',
  'NAMETN-CONTAINS': 'NW ',
  'NAMETT-CONTAINS': 'NW ',
  'SUB-CONTAINS': 'SW ',
  'SUBP-CONTAINS': 'SW ',
  'SUBC-CONTAINS': 'SW ',
  'SUBM-CONTAINS': 'SW ',
  'SUBUT-CONTAINS': 'SW ',
  'SUBNE-CONTAINS': 'SW ',
  'SUBCT-CONTAINS': 'SW ',
  'SUBTT-CONTAINS': 'SW ',
  'SUBGN-CONTAINS': 'SW ',
  'SUBU-CONTAINS': 'SW ',
  'SUBFTT-CONTAINS': 'SW ',
  'SUBFGF-CONTAINS': 'SW ',
  'SUBO-CONTAINS': 'SW ',
  'SUBF-CONTAINS': 'SW ',
  'SUBCO-CONTAINS': 'SW ',
  'SUBHPN-CONTAINS': 'SW ',
  'SUBL-CONTAINS': 'SW ',
  'PN-CONTAINS': 'PW ',
  'PW-CONTAINS': 'PW ',
  'PP-CONTAINS': 'PW ',
  'CC-CONTAINS': 'AW ',
  'OC-CONTAINS': 'AW ',
  'ZC-CONTAINS': 'AW ',
  'SC-CONTAINS': 'AW ',
  'DC-CONTAINS': 'AW ',
  'LC-CONTAINS': 'AW ',
  'MC-CONTAINS': 'AW ',
  'LX-CONTAINS': 'AW ',
  'CH-CONTAINS': 'AW ',
  'UC-CONTAINS': 'AW ',
  'CD-CONTAINS': 'AW ',
  'MN-CONTAINS': 'AW ',
  'LN-CONTAINS': 'AW ',
  'MUSP-CONTAINS': 'AW ',
  'NN-CONTAINS': 'AW ',
  // Authority ESTEPI-TODO
  'TI-CONTAINS': 'TI ',
  'NA-CONTAINS': 'NA ',
  'NP-CONTAINS': 'NW ',
  'TI-MATCH': 'TI ',
  'NA-MATCH': 'TI ',
  'NP-MATCH': 'TI '
};

export const findYourQueryFromBrowse = {
  // FOR START KEY
  'NAME-BROWSE': 'NK ',
  'SUB-BROWSE': 'SK ',
  'TITLE-BROWSE': 'TK ',
  'NAMETN-BROWSE': 'NTK ',
  'NAMETT-BROWSE': 'NTK ',
};
