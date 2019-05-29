// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { identity } from 'lodash';
import * as Resolver from '../helpers/resolver';
import { ENDPOINT } from '../../config/constants';
import { ACTION } from '../actions';

const initialState = {};
const historyState = { list: [] };


/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} record
 */
export const resolveEpicRequest = (data, payload) => ({
  type: ACTION.REQUEST_RESOLVE,
  data,
  payload,
});

/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} error
 */
export const rejectEpicRequest = (data, error) => ({
  type: ACTION.REQUEST_REJECT,
  data,
  error
});

/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} error
 */
export const executeEpicCallback = (cb) => ({
  type: ACTION.EXECUTE_CALLBACK_FIRED,
  cb
});

/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} error
 */
export const resolveHistoryRequest = (data) => ({
  type: ACTION.HISTORY,
  data,
});


/**
 * The main store reducer
 * @param {Object} state - initial state
 * @param {Object} action - redux action dispatched
 */
export function reducer(state: {} = initialState, action: {}) {
  switch (action.type) {
  case ACTION.REQUEST_RESOLVE:
    return Object.assign({
    }, state, Resolver.resolveData(action.data, action.payload));
  case ACTION.REQUEST_REJECT:
    return Object.assign({
    }, state, Resolver.rejectData(action.data, action.error));
  case ACTION.EXECUTE_CALLBACK:
    return action.cb;
  case ACTION.REQUEST_REMOVE:
    return Object.assign({
    }, state, Resolver.removeRequestData(state, action.key));
  case ACTION.REQUEST_DESTROY:
    return Object.assign({
    }, state, Resolver.destroyData(state)); // into state there's all data reducer request
  default:
    return state;
  }
}

/**
 * The history reducer
 * @param {Object} state - initial state
 * @param {Object} action - redux action dispatched
 */
export function historyReducer(state = historyState, action) {
  switch (action.type) {
  case ACTION.HISTORY:
    return {
      ...state,
      list: [...state.list, action.data]
    };
  case ACTION.HISTORY_CLEAR:
    return {
      ...state,
      ...historyState
    };
  default:
    return state;
  }
}

/**
 *
 * @param {*} response
 * @returns
 */
const parseResponseBody = (response: {}) => { // metodo statico
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

/**
 *
 * @param {*} method - Http method for fetch
 * @returns
 */
const getHeaders = () => {
  const headers = {
    'Accept': 'application/json',
    'x-okapi-tenant': 'tnx',
    'Content-Type': 'application/json'
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
    [ACTION.UPDATE]: 'PUT',
    [ACTION.CREATE]: 'POST',
    [ACTION.DELETE]: 'DELETE',
    [ACTION.LOCK]: 'LOCK',
    [ACTION.UNLOCK]: 'UNLOCK',
  };

  return action$
    .filter(({ type }) => actionMethods[type])
    .mergeMap(({ type, data, payload, cb }) => {
      const state = getState();
      const method = actionMethods[type];

      // the request object created from this action
      const request = state.marccat.data[data.type];
      console.log(request);

      // let url = `${state.okapi.url}${data.path}`;
      const url = `${ENDPOINT.BASE_URL}${data.path}?${(data.params)}`;
      const headers = getHeaders();
      const body = JSON.stringify(payload);

      const promise = fetch(url, { method, headers, body })
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      const resolve = response => resolveEpicRequest(data, response);
      const callback = response => executeEpicCallback((cb) ? cb(response) : identity);
      const error = (d, r) => Observable.of(rejectEpicRequest(d, r));

      return Observable.from(promise)
        .flatMap(response => {
          return Observable.of(
            resolve(response),
            callback(response)
          ).catch(errors => error(data, errors));
        });
    });
}
