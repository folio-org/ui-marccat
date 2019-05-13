// @flow strict
import { uniqueId } from 'lodash';
import { selectKey } from './Selector';

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} payload
 * @returns
 */
export const pendingRequestData = (model, data) => {
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || uniqueId(`@@marccat-${model}`),
      isPending: true,
      isResolved: false,
      isRejected: false,
      records: [],
      meta: {},
      errors: []
    }
  };
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} payload
 * @returns
 */
export const resolveData = (model, data, payload) => {
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || payload.id,
      key: data.key,
      isPending: false,
      isResolved: true,
      isRejected: false,
      results: payload || [],
      query: data.query,
      meta: data.meta,
      errors: data.errors
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
 * @param {*} payload
 * @returns
 */
export const rejectData = (model, data, errors) => {
  return {
    [model]: {
      timestamp: new Date(),
      action: model,
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || uniqueId(`@@marccat-${model}`),
      isPending: false,
      isResolved: false,
      isRejected: true,
      results: [],
      meta: {},
      errors
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
