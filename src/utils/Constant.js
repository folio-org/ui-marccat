
// MARCCAT UI APP METADADA

export const META = {
  MODULE_NAME: 'ui-marccat',
  NAME: 'marccat',
  ICON_TITLE: 'marccat',
  SRC_PATH: `${__dirname}/src`,
  PACKAGE: `${__dirname}/package`,
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
  SEARCH_URL: 'searchVertical',
  SEARCH_URL_JSON: 'search',
  INDEX_CATEGORY: 'index-categories',
  DIACRITIC_LIST_URL: 'diacritics',
  BROWSING_FIRST_PAGE: 'first-page',
  DEFAULT_LANG: 'eng',
  DEFAULT_PAGINATION: 20,
};

export const buildUrl = (url:string, params?:string) => {
  return ENDPOINT.BASE_URL
    .concat('/')
    .concat(url)
    .concat('?')
    .concat(params);
};

// REDUX
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const INITIAL_RESULT_COUNT = 30;
export const RESULT_COUNT_INCREMENT = 30;
export const RESULT_PER_REQUEST = 20;
export const FILTER_CONFIG = [{}];
export const SEPARATOR = ';;;';

// Marc Constants
export const MARC = {
  CHARACTER_SEPARATOR: '\u001f',
  CHARACTER_DOLLAR: '$',
  CONTROL_FIELD: 'controlfield',
  DATA_FIELD: 'datafield',
  VARIABLE_FIELD: 'variableField',
  FIXED_FIELD: 'fixedField',
  MARCCAT_KEY_STORE: 'ui_marccat_'
};

export const EMPTY_PARAMETER = -1;
export const EMPTY_MESSAGE = '';

export const TAB_CONTROL_ID = {
  SEARCH: 'search',
  DATABASE: 'database',
  TEMPLATE: 'template'
};
