import { isEmpty, uniqueId } from 'lodash';

export function BaseStoreReducer() {}
export function StoreReducer() {}
export function FormReducer() {}
export function Dispatcher() {}

Object.setPrototypeOf(StoreReducer, BaseStoreReducer);

FormReducer.resolve = (store, formName) => {
  return (store.getState().form[formName]) ? store.getState().form[formName].values : undefined;
};

StoreReducer.get = (store, reducer, prop) => {
  return store.getState().marccat[reducer][prop];
};
StoreReducer.resolve = (data, model, jsonApiKey) => {
  return (!jsonApiKey) ? data[model].records : data[model].records[jsonApiKey];
};

StoreReducer.createDataStore = (model, data, payload) => { // metodo statico
  return {
    [model]: {
      timestamp: new Date(),
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || uniqueId('@@marccat-'),
      isPending: isEmpty(payload),
      isResolved: !isEmpty(payload),
      isRejected: isEmpty(payload),
      records: payload || [],
      meta: {},
      errors: []
    }
  };
};

StoreReducer.parseResponseBody = (response) => { // metodo statico
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

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


Dispatcher.query = (type, params, { path }) => ({
  type: '@@ui-marccat/QUERY',
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  }
});
