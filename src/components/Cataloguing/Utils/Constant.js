
// MARC SPECIFIC API
export const RESOURCE_TYPE = 'okapi';
export const ENDPOINT = {
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-okapi-tenant': 'tnx',
  },
  DEFAULT_LANG_VIEW: 'lang=ita&view=1',
  BASE_URL: 'http://151.1.165.20:8080/marccat',
  VIEW_TEMPLATE_URL: '/record-templates',
  VIEW_TEMPLATE_URL_BY_ID: '/record-template/',
  EMPTY_RECORD_URL: '/bibliographic-record/from-template/',
  TEMPLATE_TAG_URL: '/fixed-fields-code-groups',
  HEADER_TYPES_URL: '/header-types',
  CREATE_HEADING_URL: '/create-heading',
  UPDATE_HEADING_URL: '/update-heading',
  DELETE_HEADING_URL: '/delete-heading',
  BIBLIOGRAPHIC_RECORD: '/bibliographic-record',
  HEADING_BY_TAG: '/headings-by-tag',
  LOCK_MARC_RECORD: '/bibliographic-record/lock/',
  UNLOCK_MARC_RECORD: '/bibliographic-record/unlock/',
  CHANGE_DISPLAY_VALUE: '/bibliographic-record/fixed-field-display-value'
};
