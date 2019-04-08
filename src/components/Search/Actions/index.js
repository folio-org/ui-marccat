import { ACTION } from '../../../shared/Action';
import { ENDPOINT } from '../../../shared/Constants';

// Search API action creator

/**
 *
 * @param {*} payload
 */
export const loadTemplateAction = () => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.VIEW_TEMPLATE_URL,
      type: 'templates',
      params: ENDPOINT.DEFAULT_LANG_VIEW.concat('&type=B'),
    }
  };
};

/**
 *
 * @param {*} payload
 */
export const getTemplateByIdAction = (id) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.VIEW_TEMPLATE_URL + '/' + id,
      id,
      type: `template[${id}]`,
      params: ENDPOINT.DEFAULT_LANG_VIEW.concat('&type=B'),
    }
  };
};

/**
 *
 * @param {*} payload
 */
export const searchDetailAction = (id) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      id,
      panelOpen: true,
      type: 'marcRecordDetail',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    }
  };
};
/**
 *
 * @param {*} payload
 */
export const countRecordAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.TOTAL_COUNT_SEARCH_URL,
      type: `record${(payload.view === 1) ? 'Bib' : 'Auth'}Count`,
      params: `lang=ita&view=${payload.view}&ml=170&q=${payload.query}`,
    }
  };
};

/**
 *
 * @param {*} payload
 */
export const historySearchAction = (payload) => {
  return {
    type: ACTION.REQUEST_HISTORY,
    moreData: 'N',
    queryBib: payload.bibQuery,
    queryAuth: payload.authQuery,
    from: '1',
    to: '30'
  };
};
