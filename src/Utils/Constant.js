// CATALOGING UI APP METADADA
export const META = {
  MODULE_NAME: 'ui-cataloging',
};

// API
export const RESOURCE_TYPE = 'rest';
export const ENDPOINT = {
  HEADERS: {
    Accept: 'application/json',
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
  INDEX_CATEGORY: 'index-categories',
  DEFAULT_LANG: 'eng',
  DEFAULT_PAGINATION: 20,
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
  VIEW_TEMPLATE: '/cataloging/templatelist/',
  ADD_TEMPLATE: '/cataloging/template/create',
  EDIT_TEMPLATE: '/cataloging/template/edit/:id',
  DELETE_TEMPLATE: '/cataloging/template/delete/:id',
  VIEW_LOGICAL_VIEW: '/cataloging/logicalview/',
  ADVANCE_SEARCH: '/cataloging/advancedSearch',
  SEARCH_RESULTS: '/cataloging/searchResults',
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
  INDEX_INNER: 'indexes',
  CONSTRAINT_INDEX: 'constraints'
};

export const INITIAL_RESULT_COUNT = 30;
export const RESULT_COUNT_INCREMENT = 30;
export const RESULT_PER_REQUEST = 20;
export const FILTER_CONFIG = [{}];
export const SEPARATOR = ';;;'

// TOASTER MESSAGE
export const TOASTER_MESSAGE = {
  INVALID_TEMPLATE_NAME: 'INVALID_TEMPLATE_NAME',
  INVALID_TEMPLATE: 'INVALID_TEMPLATE',
  SAVE_FAILURE: 'SAVE_FAILURE',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
};

// ANIMATIONS
export const ANIMATION = {
  ZOOMIN: 'zoomin',
  SLIDEIN: 'slidein',
  SLIDEOUT: 'slideout',
  FADE: 'fade',
  SLIDEIN_SPRING: 'slidein-spring',
  FOUNTAIN: 'fountain',
};

// POSITION
export const POSITION = {
  TOP_RIGHT: 'tr',
  TOP_LEFT: 'tl',
  BOTTOM_RIGHT: 'br',
  BOTTOM_LEFT: 'bl',
};

// EVENT
export const EVENT = {
  HOVER: 'hover',
  CLICK: 'click',
  FOCUS: 'focus',
};

// ERROR MEESSAGE
export const ERROR_TYPES = {
  INVALID_TEMPLATE_NAME: 1,
  INVALID_TEMPLATE: 2,
  SAVE_FAILURE: 3,
  SAVE_SUCCESS: 4,
};

// Navigator

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