import { HTTP_METHOD } from '../../shared/Constants';
/**
 *
 * @param {*} url - the API endpoint
 * @param {*} store - the data store
 */
export function get(url:string) {
  return fetch(url, {
    method: HTTP_METHOD.GET,
    headers: Object.assign({}, {
      'x-okapi-tenant': 'tnx',
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
export function post(url:string, data: any) {
  return fetch(url, {
    method: HTTP_METHOD.POST,
    headers: Object.assign({}, {
      'x-okapi-tenant': 'tnx',
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
export function put(url:string, data: any) {
  return fetch(url, {
    method: HTTP_METHOD.PUT,
    headers: Object.assign({}, {
      'x-okapi-tenant': 'tnx',
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
export function remove(url:string, cb?: () => void) {
  fetch(url, {
    method: HTTP_METHOD.DELETE,
    headers: Object.assign({}, {
      'x-okapi-tenant': 'tnx',
      'Content-Type': 'application/json'
    })
  }).then(cb);
}
