import { uniqueId } from 'lodash';

const Redux = () => {};
const ReduxForm = () => {};


ReduxForm.resolve = (store, formName) => {
  return (store.getState().form) ? store.getState().form[formName || 0].values : undefined;
};

ReduxForm.reset = (store, ...forms) => {
  return (dispatch, reset) => forms.map(f => dispatch(reset(f.name)));
};

/**
 *
 * @param {*} store
 * @param {*} reducer
 * @param {*} prop
 * @returns
 */
Redux.get = (store, reducer, prop) => {
  return store.getState().marccat[reducer][prop];
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} jsonApiKey
 * @returns
 */
Redux.resolve = (data, model) => {
  return (data[model] && data[model].results) ? data[model].results : {};
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} payload
 * @returns
 */
Redux.pendingRequestData = (model, data) => { // metodo statico
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
Redux.resolveRequestData = (model, data, payload) => { // metodo statico
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || payload.id,
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
Redux.storeHistoryData = (data) => { // metodo statico
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
Redux.rejectRequestData = (model, data, errors) => { // metodo statico
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
 * Helper for retrieving or creating a record from the resource
 * type's state
 * @param {Object} store - the resource type's
 * @param {String} id - the record's id
 */
Redux.getRecord = (store, id) => (
  store.records[id] || {
    id,
    isLoading: true,
    isLoaded: false,
    isSaving: false,
  }
);
/**
 * Helper remove record from the resource
 * type's state
 * @param {Object} store - the resource type's
 * @param {String} id - the record's id
 */
Redux.reduce = (store, id) => (
  store.records[id] || {
    id,
    isLoading: true,
    isLoaded: false,
    isSaving: false,
  }
);

export {
  Redux,
  ReduxForm
};
