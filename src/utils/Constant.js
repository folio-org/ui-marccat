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
  BASE_URL: 'marccat',
  SEARCH_URL: '/searchVertical',
  SEARCH_URL_JSON: '/search',
  DOC_COUNT_URL: 'document-count-by-id'
};

// REDUX DATA STORE MANAGEMENT
export const STATE_MANAGEMENT = {
  REDUCER: 'marccat',
  EPIC: 'marccat',
};

export const SEPARATOR = ';;;';
export const EMPTY_PARAMETER = -1;
export const EMPTY_MESSAGE = '';
