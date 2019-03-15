/* eslint-disable import/prefer-default-export */
import { ACTION } from './Action';
import { ENDPOINT } from './Constants';

/**
 *
 * @param {*} payload
 */
export const headingAction = (payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CREATE_HEADING_URL,
      type: `${payload.id}-${payload.tag}-`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
    payload
  };
};
