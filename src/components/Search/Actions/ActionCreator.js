import { ACTION } from '../../../shared/Action';
import { ENDPOINT } from '../../../shared/Constants';

// Search API action creator

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
export const emptyRecordAction = () => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.EMPTY_RECORD_URL + '/' + 408,
      type: 'emptyRecord',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
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
