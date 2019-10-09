// @flow
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import * as Resolver from '../helpers/Resolver';
import { ACTION } from '../actions';
// import { ENDPOINT } from '../../config/constants';

const initialState = {};
const historyState = { list: [] };


/**
 *
 * @param {*} name
 * @param {*} data
 * @param {*} record
 */
export const resolveEpicRequest = (name, data, record) => ({
  type: ACTION.REQUEST_RESOLVE,
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
  type: ACTION.REQUEST_REJECT,
  data,
  name,
  error
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
 *
 * @param {*} name
 * @param {*} data
 * @param {*} error
 */
export const executeEpicCallback = () => ({
  type: ACTION.EXECUTE_CALLBACK_FIRED
});

/**
 * The main store reducer
 * @param {Object} state - initial state
 * @param {Object} action - redux action dispatched
 */
export function reducer(state: Object = initialState, action: Object) {
  switch (action.type) {
  case ACTION.REQUEST_RESOLVE:
    return Object.assign({
    }, state, Resolver.resolveData(action.name, action.data, action.payload));
  case ACTION.REQUEST_REJECT:
    return Object.assign({
    }, state, Resolver.rejectData(action.name, action.data, action.error));
  case ACTION.EXECUTE_CALLBACK:
    return action.cb;
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
const parseResponseBody = (response: Object) => { // metodo statico
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};


export const getHeaders = (state) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'X-Okapi-Tenant': 'tnx'
    'X-Okapi-Tenant': `${state.okapi.tenant}`,
    'X-Okapi-Token': `${state.okapi.token}`
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

      // const url = ENDPOINT.DEV_VM_OKAPI_URL.concat(`${data.path}?${(data.params)}`);
      const url = `${state.okapi.url}/marccat${data.path}?${(data.params)}`;
      const headers = getHeaders(state);
      const body = JSON.stringify(payload);

      const promise = fetch(url, { method, headers, body })
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      return from(promise)
        .flatMap(response => {
          return of(
            resolveEpicRequest(data.type, data, response),
            executeEpicCallback((cb) ? cb(response) : () => { })
          );
        }).catch(errors => of(rejectEpicRequest(errors)));
    });
}
