// MARCCAT UI APP METADADA
export const META = {
  MODULE_NAME: 'ui-marccat',
  NAME: 'marccat',
  ICON_TITLE: 'marccat',
  SRC_PATH: `${__dirname}/src`,
  PACKAGE: `${__dirname}/package`,
};

// API
export const RESOURCE_TYPE = 'okapi';
export const ENDPOINT = {
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-okapi-tenant': 'tnx',
  },
  BASE_URL: 'http://127.0.0.1:8080/marccat',
  MERGED_SEARCH_URL: '/mergedSearch',
  SEARCH_URL: '/searchVertical',
  SEARCH_URL_JSON: '/search',
  DOC_COUNT_URL: 'document-count-by-id',
  BROWSE_FIRST_PAGE_URL: '/browse',
  VIEW_TEMPLATE_URL: '/record-templates',
  VIEW_TEMPLATE_URL_BY_ID: '/record-template/',
  EMPTY_RECORD_URL: '/bibliographic-record/from-template/',
  TEMPLATE_TAG_URL: '/fixed-fields-code-groups'
};

// REDUX DATA STORE MANAGEMENT
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const SEPARATOR = ';;;';
export const EMPTY_PARAMETER = -1;
export const EMPTY_MESSAGE = '';
