import { ACTION } from '../../../redux/helpers/Action';
import { ENDPOINT } from '../Utils/Constant';

// MARC API action creator

/**
 *
 * @param {*} payload
 */
export const headingAction = (id, payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CREATE_HEADING_URL,
      type: `${id}-${payload.tag}`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
    payload
  };
};

/**
 *
 * @param {*} payload
 */
export const changeDisplayValueAction = (tag, payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CHANGE_DISPLAY_VALUE,
      type: `displayvalue-${tag}`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      tag
    },
    payload
  };
};
  /**
   *
   * @param {*} id
   * @param {*} payload
   */
export const deleteRecordAction = (id, payload) => {
  return {
    type: ACTION.DELETE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      type: `deleteRecord-${id}-` + Date.now(),
      params: 'view=1',
      id,
      payload
    }
  };
};
