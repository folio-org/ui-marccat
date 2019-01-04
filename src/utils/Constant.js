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
  BASE_URL: 'http://localhost:8080/marccat',
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
};

// REDUX DATA STORE MANAGEMENT
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const SEPARATOR = ';;;';
export const EMPTY_PARAMETER = -1;
export const EMPTY_MESSAGE = '';


// SETTINGS
export const DEFAULT_TEMPLATE = {
  id: 408,
  name: 'New Monograph'
};
