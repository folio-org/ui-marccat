import { Observable } from 'rxjs/Observable';
import { qs } from '..';
import { Redux } from '../helpers/Redux';
import {
  ACTION,
  REQUEST_MAKE,
  REQUEST_RESOLVE,
  REQUEST_REJECT } from '../../shared/Action';
import { ENDPOINT, HTTP_METHOD } from '../../shared/Constants';

export const EPIC_MODEL_KEY = {
  EMPTY_RECORD: 'emptyRecord',
  RECORD_DETAIL: 'marcRecordDetail',
  LEADER_DATA: 'leaderData'
};
/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} record
 */
export const createEpicRequest = (name, data, record) => ({
  type: REQUEST_MAKE,
  name,
  data,
  payload: record,
});

/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} record
 */
export const resolveEpicRequest = (name, data, record) => ({
  type: REQUEST_RESOLVE,
  name,
  data,
  payload: record,
});

/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} error
 */
export const rejectEpicRequest = (name, data, error) => ({
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
    }, state, Redux.pendingRequestData(action.name, action.data));
  case REQUEST_RESOLVE:
    return Object.assign({
    }, state, Redux.resolveRequestData(action.name, action.data, action.payload));
  case REQUEST_REJECT:
    return Object.assign({
    }, state, Redux.rejectRequestData(action.name, action.data, action.error));
  default:
    return state;
  }
}

/**
 *
 * @param {*} response
 * @returns
 */
const parseResponseBody = (response) => { // metodo statico
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

/**
 *
 * @param {*} method - Http method for fetch
 * @returns
 */
const getHeaders = (method) => {
  const headers = {
    'x-okapi-tenant': 'tnx',
    'Content-Type': (method === 'PUT' || method === 'POST') ? 'application/vnd.api+json' : 'application/json'
  };
  return headers;
};

/**
 * The epic used to actually make a requests when an action is dispatched
 * @param {Observable} action$ - the observable action
 * @param {Function} store.getState - get's the most recent redux state
 */
export function epic(action$, { getState }) {
  const actionMethods = {
    [ACTION.QUERY]: 'GET',
    [ACTION.FIND]: 'GET',
    [ACTION.PUT]: 'PUT',
    [ACTION.CREATE]: 'POST',
    [ACTION.DELETE]: 'DELETE',
    [ACTION.LOCK]: 'LOCK',
    [ACTION.UNLOCK]: 'UNLOCK',
  };

  return action$
    .filter(({ type }) => actionMethods[type])
    .mergeMap(({ type, data, payload }) => {
      const state = getState();
      const method = actionMethods[type];

      const HTTP_GET_METHODS = (type === ACTION.QUERY || type === ACTION.FIND);
      const REST_METHODS = (method === HTTP_METHOD.PUT || method === HTTP_METHOD.POST || method === HTTP_METHOD.DELETE);

      // let url = `${state.okapi.url}${data.path}`;
      let url = `${ENDPOINT.BASE_URL}${data.path}`;
      const headers = getHeaders(method, state);
      let body;

      if (HTTP_GET_METHODS && Object.keys(data.params).length !== 0) {
        url = `${url}?${(data.params)}`;
      }

      if (data.params.include) {
        let include = data.params.include;
        include = Array.isArray(include) ? include.join(',') : include;
        url = `${url}?${qs.stringify({ include })}`;
      }

      if (REST_METHODS) {
        body = JSON.stringify(payload);
      }

      const promise = fetch(url, { headers, method, body })
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      return Observable.from(promise)
        .map(response => resolveEpicRequest(data.type, data, response))
        .catch(errors => Observable.of(rejectEpicRequest(errors)));
    });
}
