import { ENDPOINT } from '../../../config/constants';
import { ACTION } from '../../../redux/actions/Actions';

// MARC action creator utility


export const leaderDropdownAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: 'leaderData',
      params: `value=${payload.value}&code=${payload.code}&headerTypeCode=${payload.typeCode}&lang=eng`,
    },
  };
};

export const editLeaderDropdownAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: 'leaderData',
      params: `leader=${payload.value}&code=${payload.code}&headerTypeCode=${15}&lang=eng&valueField=${payload.value}`,
    },
  };
};

export const edit008DropdownAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: 'dropDown008edit',
      params:  `leader=${payload.leader}&code=${payload.code}&headerTypeCode=${payload.headerTypeCode}&lang=eng&valueField=${payload.valueField}`,
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
      params: `tag=${payload.code}&ind1=${payload.ind1}&ind2=${payload.ind2}&displayValue=${payload.displayValue}&view=1&mainLibrary=170&pageSize=30&lang=eng`,
    },
  };
};
/**
 *
 * @param {*} payload
 */
export const continueFetchingBrowse = (query, cb) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.BROWSE_NEXT_PAGE,
      type: 'browseNextPage',
      params: `query=${query}&view=1&mainLibrary=170&pageSize=30&lang=eng`,
    },
    cb,
  };
};
/**
 *
 * @param {*} payload
 */
export const triggerTagCodeSuggestion = (payload, cb) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.SUGGEST_TAG_CODE,
      type: 'tagCodeSuggestion',
      params: `tagNumber=${payload}`,
    },
    cb
  };
};

export const triggerBrowseHeadingSuggestion = (code, ind1, ind2, displayValue, cb) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADING_BY_TAG,
      type: 'headingSuggestion',
      params: `tag=${code}&indicator1=${ind1}&indicator2=${ind2}&stringText=${displayValue}&view=1&mainLibrary=170&pageSize=7&lang=eng`,
    },
    cb
  };
};
/**
 *
 * @param {*} payload
 */
export const triggerTagIndicatorsSuggestion = (payload, cb) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.SUGGEST_TAG_INDICATORS,
      type: 'tagIndicatorsSuggestion',
      params: `tagNumber=${payload}`,
    },
    cb
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
      type: `fixedfield${payload.code}`,
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
      path: ENDPOINT.EMPTY_RECORD_URL + 1,
      type: 'emptyRecord',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
  };
};

export const emptyRecordAuthAction = () => {
  return {
    type: ACTION.QUERY,
    data: {
      // path: ENDPOINT.EMPTY_RECORD_AUTH_URL + 1,
      path: ENDPOINT.EMPTY_RECORD_URL + 1,
      type: 'emptyRecordAuth',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
  };
};

export const lockRecordAction = (payload) => {
  return {
    type: ACTION.UPDATE,
    data: {
      path: ENDPOINT.LOCK_MARC_RECORD + payload.id,
      type: 'lockedRecords',
      params: `userName=${payload.user}&uuid=${payload.idLock}&type=R`
    },
    cb: payload.cb
  };
};

export const checkIndValid = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.CHECK_VALIDATE,
      type: 'checkTagInd',
      params: `ind1=${payload.ind1}&ind2=${payload.ind2}&tag=${payload.tag}`
    },
    cb: payload.cb
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

export const headertypeAction = (tag) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADER_TYPES_URL,
      type: `headertype${tag}`,
      params: `code=${tag}&lang=eng`,
    },
  };
};

export const editDropDownValuesAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: `headerTypeValues${payload.code}`,
      key: payload.code,
      id: payload.code,
      params: `leader=${payload.value}&code=${payload.code}&lang=eng&valueField=${payload.displayValue}&headerTypeCode=${payload.headerTypeCode}`
    },
    cb: payload.cb
  };
};

export const dropDownValuesAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: `headerTypeValues${payload.code}`,
      key: payload.code,
      id: payload.code,
      params: `leader=${payload.value}&code=${payload.code}&headerTypeCode=${payload.headerTypeCode}&lang=eng`
    },
    cb: payload.cb
  };
};

export const change008ByLeaderAction = (payload) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.CHANGE_TAG_DISPLAY_VALUE_FROM_LEADER,
      leader: payload,
      type: 'headerTypeValues008',
      params: `leader=${payload}&lang=eng`
    },
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
      params: 'lang=eng',
    },
  };
};

export const initialActions = [leaderDropdownAction, headertypeAction];
