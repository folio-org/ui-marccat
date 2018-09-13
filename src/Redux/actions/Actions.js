/* MARCCAT ACTIONS TYPES */
export const actionTypes = {
  SEARCH: '@@ui-marccat/SEARCH',
  QUERY: '@@ui-marccat/QUERY',
  FIND: '@@ui-marccat/FIND',
  SAVE: '@@ui-marccat/SAVE',
  CREATE: '@@ui-marccat/CREATE',
  DELETE: '@@ui-marccat/DELETE',
  UPDATE: '@@ui-marccat/UPDATE',
  REJECT: '@@ui-marccat/REJECT',
  SAVE_TAG: '@@ui-marccat/SAVE_TAG',
  FETCH_LOGICAL_VIEWS: '@@ui-marccat/FETCH_LOGICAL_VIEWS',
  FETCH_LOGICAL_VIEWS_SUCCESS: '@@ui-marccat/FETCH_LOGICAL_VIEWS_SUCCESS',
  FETCH_LOGICAL_VIEWS_FAILURE: '@@ui-marccat/FETCH_LOGICAL_VIEWS_FAILURE',
  SHOW_TAG_SECTION: '@@ui-marccat/SHOW_TAG_SECTION',
  DIACRITIC_CHAR: '@@ui-marccat/DIACRITIC_CHAR',
  RECEIVED_SEARCH: '@@ui-marccat/RECEIVED_SEARCH',
  CLEAR_SEARCH_RESULTS: '@@ui-marccat/CLEAR_SEARCH_RESULTS',
};

export const reduxActionTypes = {
  REDUX_FORM_CHANGE: '@@redux-form/CHANGE',
  REDUX_FORM_BLUR: '@@redux-form/CHANGE',
  FORM_REDUX_RESET: '@@redux-form/RESET',
};
