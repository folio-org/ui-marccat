// API
export const RESOURCE_TYPE = 'rest';
export const ENDPOINT = {
  HEADER: { KEY: 'x-okapi-tenant', VALUE: 'tnx' },
  BASE_URL: 'http://127.0.0.1:8080/cataloging',
  TEMPLATE_URL: 'record-templates',
  TEMPLATE_MANDATORY: 'bibliographic/fields/mandatory',
  LOGICAL_VIEW_URL: 'logical-views',
  DEFAULT_LANG: 'eng'
};
export const API_RESULT_JSON_KEY = {
  TEMPLATES: 'recordTemplates',
  LOGICAL_VIEW: 'views'
};

export const INITIAL_RESULT_COUNT = 30;
export const RESULT_COUNT_INCREMENT = 30;
export const RESULT_PER_REQUEST = 20;
export const filterConfig = [{}];

// Navigator


// Select Logical View
export const LOGICAL_VIEW_SELECT = {
  ID: 'id_logicalView',
  LABEL: 'Database',
  EMPTY_VALUE: { value: '----------', label: '----------' },
  INITIAL_VALUE: '0'
};

