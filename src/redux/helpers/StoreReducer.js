export function BaseStoreReducer() {}
export function StoreReducer() {}
export function Dispatcher() {}

Object.setPrototypeOf(StoreReducer, BaseStoreReducer);

StoreReducer.createDataStore = (model, data, payload) => { // metodo statico
  return {
    [model]: {
      timestamp: new Date(),
      // size: payload.length,
      path: data.path,
      resource: data.type,
      host: window.location.hostname,
      params: data.params,
      id: data.id || undefined,
      isPending: !!(payload.length),
      isResolved: !!(payload.length),
      isRejected: (!payload),
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
    'x-okapi-tenant': 'tnx',
    'Content-Type': 'application/json'
  };

  if (method === 'PUT' || method === 'POST') {
    headers['Content-Type'] = 'application/vnd.api+json';
  }
  return headers;
};


Dispatcher.query = (type, params, { path }) => ({
  type: '@@ui-marccat/QUERY',
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  }
});
