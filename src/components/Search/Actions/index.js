import { ENDPOINT, SEARCH_SEGMENT } from '../../../config/constants';
import { ACTION } from '../../../redux/actions';

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

export const countAction = () => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.TOTAL_COUNT_SEARCH_URL,
      type: 'count',
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
export const searchDetailAction = (id, segment) => {
  const endPoint = (segment === SEARCH_SEGMENT.AUTHORITY) ? ENDPOINT.AUTHORITY_RECORD + '/' + id : ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id;
  return {
    type: ACTION.QUERY,
    data: {
      path: endPoint,
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
export const duplicaRecordAction = (id, cb) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.DUPLICATE_RECORD_URL,
      type: 'recordDuplicate',
      params: `id=${id}`.concat('&').concat(ENDPOINT.DEFAULT_LANG_VIEW),
      id
    },
    cb
  };
};


/**
 *
 * @param {*} payload
 */
export const historySearchAction = (data) => {
  return {
    type: ACTION.HISTORY,
    data
  };
};

/**
 *
 * @param {*} payload
 */
export const resetHistoryAction = () => {
  return {
    type: ACTION.HISTORY_CLEAR,
  };
};

/**
 *
 * @param {*} payload
 */
export const resetFilterSearch = (segment) => {
  return {
    type: ACTION.FILTER_SEARCH_CLEAR,
    segment
  };
};

/**
 *
 * @param {*} payload
 */
export const segmentActive = (segment) => {
  return {
    type: ACTION.FILTER_SEGMENT_ACTIVE,
    segment
  };
};
