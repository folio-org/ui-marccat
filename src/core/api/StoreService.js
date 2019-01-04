export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

/**
 *
 * @param {*} url - the API endpoint
 * @param {*} store - the data store
 */
export function get(url:string, store) {
  const okapi = store.getState().okapi;
  fetch(url, {
    method: HTTP_METHOD.GET,
    headers: Object.assign({}, {
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
      'Content-Type': 'application/json'
    })
  });
}

/**
 *
 * @param {*} url - the API endpoint
 * @param {*} data - the body of request
 * @param {*} store - the data store
 */
export function post(url:string, data: any, store) {
  const okapi = store.getState().okapi;
  fetch(url, {
    method: HTTP_METHOD.POST,
    headers: Object.assign({}, {
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data),
  });
}

/**
 *
 * @param {*} url - the API endpoint
 * @param {*} data - the body of request
 * @param {*} store - the data store
 */
export function put(url:string, data: any, store) {
  const okapi = store.getState().okapi;
  fetch(url, {
    method: HTTP_METHOD.PUT,
    headers: Object.assign({}, {
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data),
  });
}

/**
 *
 * @param {*} url - the API endpoint
 * @param {*} store - the data store
 */
export function del(url:string, store) {
  const okapi = store.getState().okapi;
  fetch(url, {
    method: HTTP_METHOD.DELETE,
    headers: Object.assign({}, {
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
      'Content-Type': 'application/json'
    })
  });
}
