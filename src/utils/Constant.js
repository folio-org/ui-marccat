// MARCCAT UI APP METADADA
export const META = {
  MODULE_NAME: 'ui-marccat',
  ICON_TITLE: 'marccat',
};

// API
export const RESOURCE_TYPE = 'okapi';
export const ENDPOINT = {
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-okapi-tenant': 'tnx',
  },
  DEFAULT_LANG_VIEW: 'lang=ita&view=1',
  BASE_URL: 'http://151.1.165.20:8080/marccat',
  MERGED_SEARCH_URL: '/mergedSearch',
  SEARCH_URL: '/searchVertical',
  SEARCH_URL_JSON: '/search',
  DOC_COUNT_URL: 'document-count-by-id',
  BROWSE_FIRST_PAGE_URL: '/browse',
  VIEW_TEMPLATE_URL: '/record-templates',
  VIEW_TEMPLATE_URL_BY_ID: '/record-template/',
  EMPTY_RECORD_URL: '/bibliographic-record/from-template/',
  TEMPLATE_TAG_URL: '/fixed-fields-code-groups',
  HEADER_TYPES_URL: '/header-types',
  BIBLIOGRAPHIC_RECORD: '/bibliographic-record',
  HEADING_BY_TAG: '/headings-by-tag',
  LOCK_MARC_RECORD: '/bibliographic-record/lock/',
  UNLOCK_MARC_RECORD: '/bibliographic-record/unlock/',
};

export const buildUrl = (url:string, params?:string, withslash?: boolean = false) => {
  return ENDPOINT.BASE_URL
    .concat((withslash) ? url.concat('/') : url)
    .concat('?')
    .concat(params);
};

export const LockEntityType = {
  R: 'R',
  H: 'H',
  C: 'C'
};

export const RECORD_FIELD_STATUS = {
  NEW: 'new',
  UNCHANGED: 'unchanged',
  CHANGED: 'changed',
  DELETED: 'deleted'
};

// REDUX DATA STORE MANAGEMENT
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const SEPARATOR = ';;;';
export const EMPTY_PARAMETER = -1;
export const EMPTY_MESSAGE = '';
export const SPACED_STRING = ' ';

export const TAGS = {
  _001: '001',
  _003: '003',
  _005: '005',
  _006: '006',
  _007: '007',
  _008: '008',
  _040: '040'
};

export const INSERTED_TAGS = (code, typeCode) => {
  return {
    'code': code,
    'mandatory': true,
    'fixedField': {
      'categoryCode': 1,
      'headerTypeCode': typeCode,
      'code': code,
      'displayValue': '',
      'sequenceNumber': 0
    },
    'added': true
  };
};
// SETTINGS
export const SETTINGS = {
  DEFAULT_TEMPLATE: {
    id: 408,
    name: 'New Monograph'
  },
};

export const separator = (s:string, sep) => s.replace(sep, '$');
