// @flow
import { uniqueId } from 'lodash';
import { selectKey } from './selector';
import { formatErrors } from './request';

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {{}} payload
 * @returns
 */
export const resolveData = (data: {}, payload: {}, cb: (r) => void) => {
  return {
    [data.type]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params || {},
      id: data.id || payload.id || -1,
      key: data.meta || data.key || data.apiKey || {},
      isPending: false,
      isResolved: true,
      isRejected: false,
      results: payload.results || payload,
      meta: data.meta || {},
      errors: {},
      callback: cb.toString()
    }
  };
};
/**
 *
 * @param {*} data
 * @returns
 */
export const resolveHistoryData = (data) => {
  return {
    timestamp: new Date(),
    data
  };
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {{}} payload
 * @returns
 */
export const rejectData = (data, errors) => {
  return {
    [data.type]: {
      timestamp: new Date(),
      action: data.type,
      resource: data.type,
      host: window.location.hostname,
      params: {},
      id: uniqueId(`@@marccat-${data.type}-error`),
      isPending: false,
      isResolved: false,
      isRejected: true,
      results: data,
      meta: {},
      errors: formatErrors(errors)
    }
  };
};

/**
 * Helper remove record from the resource
 * type's state
 * @param {Object} store - the resource type's
 * @param {String} id - the record's id
 */
export const reduce = (store, id) => (
  store.getState().records[id] || {
    id,
    isLoading: true,
    isLoaded: false,
    isSaving: false,
  }
);

/**
 * Helper for retrieving or creating a record from the resource
 * type's state
 * @param {Object} store - the resource type's
 * @param {String} id - the record's id
 */
export const getRecord = ({ store: { key } }, id) => {
  return selectKey(key).results[id];
};

export const removeRequestData = (data, key: String | []) => {
  if (Array.isArray(key)) {
    key.forEach(k => delete data[k]);
  } else {
    delete data[key];
  }
};

export const destroyData = (data: {}) => {
  Object.keys(data).forEach(k => delete data[k]);
};
