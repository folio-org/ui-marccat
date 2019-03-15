import { uniqueId } from 'lodash';

export function BaseStoreReducer() {}
export function StoreReducer() {}
export function FormReducer() {}
export function Dispatcher() {
}

Object.setPrototypeOf(StoreReducer, BaseStoreReducer);
Object.setPrototypeOf(FormReducer, BaseStoreReducer);

FormReducer.resolve = (store, formName) => {
  return (store.getState().form[formName]) ? store.getState().form[formName].values : undefined;
};

Dispatcher.dispatch = (action, dispatch) => {
  return dispatch({ type: action });
};

/**
 *
 * @param {*} store
 * @param {*} reducer
 * @param {*} prop
 * @returns
 */
StoreReducer.get = (store, reducer, prop) => {
  return store.getState().marccat[reducer][prop];
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} jsonApiKey
 * @returns
 */
StoreReducer.resolve = (data, model) => {
  return (data[model] && data[model].results) ? data[model].results : {};
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} payload
 * @returns
 */
StoreReducer.createRequestData = (model, data) => { // metodo statico
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || uniqueId('@@marccat-'),
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
StoreReducer.createDataStore = (model, data, payload) => { // metodo statico
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || uniqueId('@@marccat-'),
      isPending: true,
      isResolved: false,
      isRejected: false,
      headingNumber: payload.headingNumber || null,
      deleted: data.payload || [],
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
 * @param {*} model
 * @param {*} payload
 * @returns
 */
StoreReducer.createRequestError = (model, data, errors) => { // metodo statico
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || uniqueId('@@marccat-'),
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
 *
 * @param {*} response
 * @returns
 */
StoreReducer.parseResponseBody = (response) => { // metodo statico
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

/**
 *
 * @param {*} method - Http method for fetch
 * @returns
 */
StoreReducer.getHeaders = (method) => { // metodo statico
  const headers = {
    'x-okapi-tenant': 'tnx', // TODO FIXME
    'Content-Type': (method === 'PUT' || method === 'POST') ? 'application/vnd.api+json' : 'application/json'
  };
  return headers;
};

/**
 * Helper for retrieving or creating a record from the resource
 * type's state
 * @param {Object} store - the resource type's
 * @param {String} id - the record's id
 */
StoreReducer.getRecord = (store, id) => (
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
StoreReducer.reduce = (store, id) => (
  store.records[id] || {
    id,
    isLoading: true,
    isLoaded: false,
    isSaving: false,
  }
);


StoreReducer.deduplicate = (obj, key) => (
  Object.values(obj.reduce((acc, cur) => Object.assign(acc, { [cur[`${key}`]]: cur }), {}))
);
