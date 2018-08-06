// MARCCAT UI APP METADADA

export const META = {
  MODULE_NAME: 'ui-marccat',
  ICON_TITLE: 'marccat',
  SRC_PATH: `${__dirname}/src`,
  STATIC_FOLDER_PATH: `${__dirname}/config/static`
};

// API
export const RESOURCE_TYPE = 'rest';
export const ENDPOINT = {
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-okapi-tenant': 'tnx',
  },
  BASE_URL: 'http://127.0.0.1:8080/cataloging',
  TEMPLATE_URL: 'record-templates',
  TEMPLATE_URL_ID: 'record-template/123',
  TEMPLATE_MANDATORY: 'bibliographic/fields/mandatory',
  CREATE_TEMPLATE: 'record-template',
  LOGICAL_VIEW_URL: 'logical-views',
  HEADING_TYPES: 'heading-types',
  FUNCTION_CODES: 'function-codes',
  ITEM_TYPES: 'item-types',
  SUBFIELDS_TAGS: 'subfield-tags',
  CATEGORY_URL: 'marc-categories',
  SEARCH_URL: 'search',
  INDEX_CATEGORY: 'index-categories',
  DIACRITIC_LIST_URL: 'diacritics',
  BROWSING_FIRST_PAGE: 'first-page',
  DEFAULT_LANG: 'eng',
  DEFAULT_PAGINATION: 20,
};

// REDUX
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const REGEX = {
  TAG_NAME: /^(?:\d{3})?$/,
};

export const COMMON_MANIFEST = {
  type: RESOURCE_TYPE,
  root: ENDPOINT.BASE_URL,
  path: ENDPOINT.TEMPLATE_URL_ID,
  headers: ENDPOINT.HEADERS,
};

export const INTERNAL_URL = {
  SETTINGS_GENERAL: '/settings/',
  SETTINGS_LOGICAL_VIEW: '/logicalview',
  VIEW_TEMPLATE: '/marccat/templateList/',
  ADD_TEMPLATE: '/marccat/templateAdd',
  EDIT_TEMPLATE: '/marccat/template/edit/:id',
  DELETE_TEMPLATE: '/marccat/template/delete/:id',
  VIEW_LOGICAL_VIEW: '/marccat/logicalview/',
  ADVANCE_SEARCH: '/marccat/advancedSearch',
  SEARCH_RESULTS: '/marccat/searchResults',
  VIEW_BROWSING: '/marccat/browsing'
};

export const API_RESULT_JSON_KEY = {
  TEMPLATES: 'recordTemplates',
  LOGICAL_VIEW: 'views',
  HEADING_TYPES: 'headingTypes',
  CATEGORIES: 'categories',
  FUNCTION_CODES: 'functionCodes',
  SUBFILED_TAG: 'subfields',
  ITEM_TYPES: 'itemTypes',
  FIELDS: 'fields',
  INDEX_CATEGORIES: 'categories',
  DIACRITIC: 'diacritics',
  BROWSING: 'headings',
  INDEX_INNER: 'indexes',
  CONSTRAINT_INDEX: 'constraints',
  MARC_CATEGORIES: 'categories',
  FIELD_TEMPLATES: 'variable-field'
};

export const INITIAL_RESULT_COUNT = 30;
export const RESULT_COUNT_INCREMENT = 30;
export const RESULT_PER_REQUEST = 20;
export const FILTER_CONFIG = [{}];
export const SEPARATOR = ';;;';


// ERROR MEESSAGE
export const ERROR_TYPES = {
  INVALID_TEMPLATE_NAME: 1,
  INVALID_TEMPLATE: 2,
  SAVE_FAILURE: 3,
  SAVE_SUCCESS: 4,
};

// Select Logical View
export const LOGICAL_VIEW_SELECT = {
  ID: 'id_logicalView',
  LABEL: 'Database',
  EMPTY_VALUE: { value: '----------', label: '----------' },
  INITIAL_VALUE: '0',
};

// Marc Constants
export const MARC_CHARACTER = {
  SEPARATOR: '\u001f',
  DOLLAR: '$',
};

// EVENTS
export const EVENTS = {
  CHAR_COPIED: 'CHAR_COPIED',
  REPLAY_SEARCH_REESULT: 'REPLAY_SEARCH_REESULT'
};

export const EMPTY_PARAMETER = -1;
