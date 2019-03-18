import { EMPTY_STRING, ENDPOINT } from '../../../shared/Constants';
import { ACTION } from '../../../shared/Action';
import { ActionTypes } from '../../../redux/actions';

// MARC action creator utility

/**
 *
 * @param {*} payload
 */
export const leaderAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.TEMPLATE_TAG_URL,
      type: 'leaderData',
      params:  `leader=${payload.value}&code=${payload.code}&headerTypeCode=${payload.typeCode}&lang=ita`,
    },
  };
};

/**
 *
 * @param {*} payload
 */
export const fixedFieldByLeaderAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_BY_LEADER_URL,
      type: 'leaderData',
      params: `leader=${payload.leader}&lang=ita&code=008`,
    },
  };
};

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
export const headingDeleteAction = (payload) => {
  return {
    type: ACTION.DELETE,
    data: {
      path: ENDPOINT.DELETE_HEADING_URL,
      type: `deleteHeading-${payload.tag}-` + Date.now(),
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
