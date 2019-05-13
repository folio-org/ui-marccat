import { ENDPOINT } from '../../../config/constants';
import { ACTION } from '../../../redux/actions/Actions';

// MARC action creator utility


/**
 *
 * @param {*} payload
 */
export const headerTypeAction = (code) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADER_TYPES_URL,
      type: `headertype${code}`,
      params: `code=${code}&lang=ita`,
    },
  };
};

/**
 *
 * @param {*} payload
 */
export const autosuggestionAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADING_BY_TAG,
      type: `headings-by-tag-${payload.code}`,
      params: `tag=${payload.code}&ind1=${payload.ind1}&ind2=${payload.ind2}&displayValue=${payload.displayValue}&view=1&mainLibrary=170&pageSize=30&lang=ita`,
    },
  };
};

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
      params: `leader=${payload.value}&code=${payload.code}&headerTypeCode=${payload.typeCode}&lang=ita`,
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
      params: `leader=${payload.leader}&lang=ita&code=${payload.tag}`,
    },
  };
};

/**
 *
 * @param {*} payload
 */
export const createHeadingAction = (id, payload) => {
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
export const changeDisplayValueAction = (payload, cb) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CHANGE_DISPLAY_VALUE,
      type: `displayvalue-${payload.code}`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
    payload,
    cb
  };
};

/**
 *
 * @param {*} payload
 */
export const saveRecordAction = (payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD,
      type: `[${payload.bibliographicRecord.id}]-` + new Date(),
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      id: payload.bibliographicRecord.id,
    },
    payload
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
      path: ENDPOINT.EMPTY_RECORD_URL + 408,
      type: 'emptyRecord',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
  };
};

/**
 *
 * @param {*} id
 * @param {*} payload
 */
export const createRecordAction = (id, payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD,
      type: `createRecord-${id}-` + Date.now(),
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      id,
    },
    payload
  };
};

/**
 *
 * @param {*} id
 * @param {*} payload
 */
export const deleteRecordAction = (id) => {
  return {
    type: ACTION.DELETE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      type: `deleteRecord-${id}-` + Date.now(),
      params: 'view=1',
      id,
    },
  };
};

export const headertypeAction = (tag) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADER_TYPES_URL,
      type: `headertype${tag}`,
      params: `code=${tag}&lang=ita`,
    },
  };
};

export const dropDownValuesAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.TEMPLATE_TAG_URL,
      type: `headerTypeValues${payload.code}`,
      key: payload.code,
      id: payload.code,
      params: `leader=${payload.value}&code=${payload.code}&headerTypeCode=${payload.headerTypeCode}&lang=ita`
    },
    cb: payload.cb
  };
};

/**
 *
 * @param {*} id
 * @param {*} payload
 */
export const settingsAction = (payload) => {
  return {
    type: ACTION.SETTINGS,
    data: {
      payload
    }
  };
};

/**
 *
 * @param {*} action
 * @param {*} leader
 * @param {*} tag
 */
export const tagValuesAction = (type, leader, tag) => {
  return {
    type,
    leader,
    code: tag.fixedField.code,
    typeCode: tag.fixedField.headerTypeCode
  };
};

/**
 *
 * @param {*} action
 * @param {*} leader
 * @param {*} tag
 */
export const typeCodeAction = (type, code) => {
  return {
    type,
    code,
  };
};
/**
 *
 * @return {*} payload
 */
export const autosuggestionTag = () => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.AUTOSUGGESTION_TAG_URL,
      type: 'tags',
      params: 'lang=ita',
    },
  };
};
