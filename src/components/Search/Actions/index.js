import { ACTION } from '../../../shared';
import { ENDPOINT } from '../../../shared/config/constants';

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
export const duplicaRecordAction = (id) => {
  return {
    type: ACTION.QUERY,
    data: {
      path: ENDPOINT.DUPLICATE_RECORD_URL,
      type: 'recordDuplicate',
      params: `id=${id}`.concat('&').concat(ENDPOINT.DEFAULT_LANG_VIEW),
      id
    }
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
