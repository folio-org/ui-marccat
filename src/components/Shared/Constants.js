// MARCCAT UI APP METADADA
export const META = {
  MODULE_NAME: 'ui-marccat',
  ICON_TITLE: 'marccat',
};

// API ENDPOINT UTILS
export const RESOURCE_TYPE = {
  REST: 'REST',
  LOCAL: 'local',
  OKAPI: 'okapi'
};
export const ENDPOINT = {
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-okapi-tenant': 'tnx',
  },
  DEFAULT_LANG_VIEW: 'lang=ita&view=1',
  BASE_URL: 'http://127.0.0.1:8080/marccat',
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
  CREATE_HEADING_URL: '/create-heading',
  UPDATE_HEADING_URL: '/update-heading',
  BIBLIOGRAPHIC_RECORD: '/bibliographic-record',
  HEADING_BY_TAG: '/headings-by-tag',
  LOCK_MARC_RECORD: '/bibliographic-record/lock/',
  UNLOCK_MARC_RECORD: '/bibliographic-record/unlock/',
};

export const FILTER_NAME = {
  BIBLIGRAPHIC: 'recordType.Bibliographic records',
  AUTHORITY: 'recordType.Authority records',
};

// REDUX DATA STORE MANAGEMENT
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const SEPARATOR = ';;;';
export const EMPTY_PARAMETER = -1;
export const EMPTY_STRING = '';
export const EMPTY_SPACED_STRING = ' ';
export const SPACED_STRING_DOUBLE_QUOTE = " "; // eslint-disable-line quotes

export const SETTINGS = {
  DEFAULT_TEMPLATE: {
    id: 408,
    name: 'New Monograph'
  },
};
