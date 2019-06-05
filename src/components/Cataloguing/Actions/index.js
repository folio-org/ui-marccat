import { ENDPOINT } from '../../../config/constants';
import { ACTION } from '../../../redux/actions/Actions';
import {
  TAGS,
} from '../Utils/MarcConstant';
import type { Dispatch } from '../../index.js.flow';

//
// ─── MARC ACTION CREATOR UTILITY ────────────────────────────────────────────────
//

/**
 *
 *
 * @export
 * @param {{}} payload
 * @returns
 */
export function leaderDropdownAction(payload: {}) {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: 'leaderData',
      apiKey: 'results',
      params: `value=${payload.value}&code=${payload.code}&headerTypeCode=${payload.typeCode}&lang=ita`,
      meta: {
        key: payload.code,
        apiKey: 'results',
        param: [{ value: payload.value }, { code : payload.code }, { headerTypeCode : payload.typeCode }],
      },
    },
  };
}
/**
 *
 *
 * @export
 * @param {{}} payload
 * @returns
 */
export function autosuggestionAction(payload) {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADING_BY_TAG,
      type: `headings-by-tag-${payload.code}`,
      params: `tag=${payload.code}&ind1=${payload.ind1}&ind2=${payload.ind2}&displayValue=${payload.displayValue}&view=1&mainLibrary=170&pageSize=30&lang=ita`,
    },
  };
}

/**
 *
 *
 * @export
 * @param {*} id
 * @param {{}} payload
 * @returns
 */
export function createHeadingAction(payload) {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CREATE_HEADING_URL,
      type: `heading${payload.code}`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      meta: {
        key: payload.code,
        code: payload.code,
        ind1: payload.ind1,
        ind2:payload.ind2,
        displayValue: payload.displayValue,
        keynumber: 0,
        apiKey: 'results',
        time: new Date(),
      }
    },
    payload,
  };
}

/**
 *
 *
 * @export
 * @param {{}} payload
 * @param {*} cb
 * @returns
 */
export function changeDisplayValueAction(payload, cb) {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CHANGE_DISPLAY_VALUE,
      type: `fixedfield${payload.code}`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      meta: {
        key: payload.code,
        apiKey: 'results',
        time: new Date(),
      }
    },
    payload,
    cb
  };
}

/**
 *
 *
 * @export
 * @param {{}} payload
 * @returns
 */
export function saveRecordAction(payload) {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD,
      type: `[${payload.bibliographicRecord.id}]-` + new Date(),
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      id: payload.bibliographicRecord.id,
      meta: {
        id:payload.bibliographicRecord.id,
        key: payload.bibliographicRecord.id,
        apiKey: 'results',
        time: new Date(),
      }
    },
    payload
  };
}

/**
 *
 *
 * @export
 * @returns
 */
export function emptyRecordAction() {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.EMPTY_RECORD_URL + 42,
      type: 'emptyRecord',
      params: ENDPOINT.DEFAULT_LANG_VIEW,
      id: 42,
      meta: {
        id: 42,
        apiKey: 'results',
        time: new Date(),
      },
    },
  };
}

/**
 *
 *
 * @export
 * @param {*} id
 * @param {{}} payload
 * @returns
 */
export function createRecordAction(id, payload) {
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
}


/**
 *
 *
 * @export
 * @param {*} id
 * @returns
 */
export function deleteRecordAction(id) {
  return {
    type: ACTION.DELETE,
    data: {
      path: ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
      type: `deleteRecord-${id}-`,
      params: 'view=1',
      id,
      meta: {
        key: id,
        apiKey: 'results',
        time: new Date(),
      }
    },
  };
}
/**
 *
 *
 * @export
 * @param {*} code
 * @returns
 */
export function headertypeAction(code) {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.HEADER_TYPES_URL,
      type: `headertype${code}`,
      params: `code=${code}&lang=ita`,
      meta: {
        key: code,
        apiKey: 'headingTypes',
        time: new Date(),
      }
    },
  };
}
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
 *
 * @export
 * @param {{}} payload
 * @param {*} cb
 * @returns
 */
export function dropDownValuesAction(payload, cb) {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.FIXED_FIELD_CODE_GROUPS_URL,
      type: `headerTypeValues${payload.code}_${payload.key}`,
      params: `leader=${payload.value}&code=${payload.code}&headerTypeCode=${payload.headerTypeCode}&lang=ita`,
      meta: {
        key: payload.key,
        apiKey: 'results',
        time: new Date(),
      }
    },
    cb
  };
}
/**
 *
 *
 * @export
 * @param {{}} payload
 * @returns
 */
export function change008ByLeaderAction(payload) {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.CHANGE_TAG_DISPLAY_VALUE_FROM_LEADER,
      leader: payload,
      type: 'headerTypeValues008',
      params: `leader=${payload}&lang=ita`,
      meta: {
        key: TAGS._008,
        apiKey: 'results',
        time: new Date(),
      }
    },
  };
}

/**
 *
 *
 * @export
 * @param {{}} payload
 * @returns
 */
export function settingsAction(payload) {
  return {
    type: ACTION.SETTINGS,
    data: {
      payload
    }
  };
}

export function dispatchAsync(action) {
  return (dispatch: Dispatch) => {
    dispatch(action);
  };
}
