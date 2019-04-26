// MARCCAT UI APP METADADA
export const META = {
  MODULE_NAME: 'ui-marccat',
  ICON_TITLE: 'marccat',
};

// API  UTILS
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
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
  TOTAL_COUNT_SEARCH_URL: '/countSearch',
  DOC_COUNT_URL: 'document-count-by-id',
  BROWSE_FIRST_PAGE_URL: '/browse',
  VIEW_TEMPLATE_URL: '/record-templates',
  VIEW_TEMPLATE_URL_BY_ID: '/record-template/',
  FIXED_FIELD_BY_LEADER_URL:'/fixed-fields-code-groups-by-leader',
  EMPTY_RECORD_URL: '/bibliographic-record/from-template/',
  DUPLICATE_RECORD_URL: '/bibliographic-record/duplicate',
  TEMPLATE_TAG_URL: '/fixed-fields-code-groups',
  HEADER_TYPES_URL: '/header-types',
  CREATE_HEADING_URL: '/create-heading',
  UPDATE_HEADING_URL: '/update-heading',
  DELETE_HEADING_URL: '/delete-heading',
  CHANGE_DISPLAY_VALUE: '/bibliographic-record/fixed-field-display-value',
  BIBLIOGRAPHIC_RECORD: '/bibliographic-record',
  HEADING_BY_TAG: '/headings-by-tag',
  CHANGE_008_BY_LEADER: '/fixed-fields-code-groups-by-leader',
  CHANGE_TAG_DISPLAY_VALUE_FROM_LEADER: '/fixed-fields-code-groups-by-leader',
  LOCK_MARC_RECORD: '/bibliographic-record/lock/',
  UNLOCK_MARC_RECORD: '/bibliographic-record/unlock/',
};

export const FILTER_NAME = {
  BIBLIGRAPHIC: 'recordType.Bibliographic records',
  AUTHORITY: 'recordType.Authority records',
};


export const SORT_TYPE = {
  TITLE: 4,  // authority and bibliographic
  UNIFORM_TITLE: 2096, // bibliographic only
  NAME: 1003, // authority and bibliographic
  AN: 54, // authority and bibliographic
  SUBJECT: 21, // authority and bibliographic
  DATA1: 31, // bibliographic only
  DATE2: 2074 // bibliographic only
};

// REDUX DATA STORE MANAGEMENT
export const REDUX = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
  FORM: {
    SEARCH_FORM: 'serchForm',
    BIBLIOGRAPHIC_FORM: 'bibliographicRecordForm',
    EDITABLE_FORM: 'marcEditableListForm'
  }
};

export const VALIDATION_MESSAGE_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARING: 'warning',
  ERROR: 'error'
};
export const SEPARATOR = ';;;';
export const EMPTY_STRING = '';
export const EMPTY_SPACED_STRING = ' ';
export const SPACED_STRING_DOUBLE_QUOTE = " "; // eslint-disable-line quotes

export const SETTINGS = {
  DEFAULT_TEMPLATE: {
    id: 42,
    name: 'New Monograph'
  },
};
