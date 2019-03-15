import { ACTION } from '../../../shared/Action';
import { ENDPOINT } from '../../../shared/Constants';

// Search API action creator

/**
 *
 * @param {*} payload
 */
export const searchDetailAction = (id, meta) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      id,
      meta,
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
export const emptyRecordAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.EMPTY_RECORD_URL + '/' + 408,
      type: 'emptyRecord',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
    payload
  };
};
