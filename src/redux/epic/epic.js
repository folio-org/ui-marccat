import { Observable } from 'rxjs/Observable';
import { qs } from '..';
import { StoreReducer } from '../helpers/StoreReducer';
import {
  ACTION,
  REQUEST_MAKE,
  REQUEST_RESOLVE,
  REQUEST_REJECT } from '../../shared/Action';
import { ENDPOINT, HTTP_METHOD } from '../../shared/Constants';

/**
 * Action creator for querying a set of records
 * @param {String} type - resource type
 * @param {Object} params - query params
 * @param {String} options.path - path to use for the query
 */
export const query = (type, params, { path }) => ({
  type: ACTION.QUERY,
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  }
});

/**
 * Action creator for create a new record
 * @param {String} type - resource type
 * @param {Object} payload - record payload
 * @param {String} [options.path] - path to use
 */
export const create = (type, payload, params, { path }) => ({
  type: ACTION.CREATE,
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  },
  payload
});

export const resolveRequest = (name, data, record) => ({
  type: REQUEST_RESOLVE,
  name,
  data,
  payload: record,
});

export const rejectRequest = (name, data, error) => ({
  type: REQUEST_REJECT,
  data,
  name,
  error
});

/**
 * The main data store reducer simply uses the handlers defined above
 * @param {Object} state - data store state leaf
 * @param {Object} action - redux action being dispatched
 */
export function reducer(state = {}, action) {
  switch (action.type) {
  case REQUEST_MAKE:
    return Object.assign({
    }, state, StoreReducer.createRequestData(action.name, action.data));
  case REQUEST_RESOLVE:
    return Object.assign({
    }, state, StoreReducer.createDataStore(action.name, action.data, action.payload));
  case REQUEST_REJECT:
    return Object.assign({
    }, state, StoreReducer.createRequestError(action.name, action.data, action.error));
  default:
    return state;
  }
}

/**
 * The epic used to actually make a requests when an action is dispatched
 * @param {Observable} action$ - the observable action
 * @param {Function} store.getState - get's the most recent redux state
 */
export function epic(action$, { getState }) {
  const actionMethods = {
    [ACTION.QUERY]: 'GET',
    [ACTION.FIND]: 'GET',
    [ACTION.SAVE]: 'PUT',
    [ACTION.CREATE]: 'POST',
    [ACTION.LOCK]: 'LOCK',
    [ACTION.UNLOCK]: 'UNLOCK',
    [ACTION.DELETE]: 'DELETE'
  };

  return action$
    .filter(({ type }) => actionMethods[type])
    .mergeMap(({ type, data, payload }) => {
      const state = getState();
      const method = actionMethods[type];

      // let url = `${state.okapi.url}${data.path}`;
      let url = `${ENDPOINT.BASE_URL}${data.path}`;
      const headers = StoreReducer.getHeaders(method, state);
      let body;

      if (type === ACTION.QUERY && Object.keys(data.params).length !== 0) {
        url = `${url}?${(data.params)}`;
      }

      if (data.params.include) {
        let include = data.params.include;
        include = Array.isArray(include) ? include.join(',') : include;
        url = `${url}?${qs.stringify({ include })}`;
      }

      if (method === HTTP_METHOD.PUT || method === HTTP_METHOD.POST) {
        body = JSON.stringify(payload);
      }

      const promise = fetch(url, { headers, method, body })
        .then(response => Promise.all([response.ok, StoreReducer.parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      return Observable.from(promise)
        .map(response => resolveRequest(data.type, data, response))
        .catch(errors => Observable.of(rejectRequest(errors)));
    });
}
