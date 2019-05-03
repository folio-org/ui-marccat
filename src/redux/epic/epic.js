import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { Redux } from '../helpers/Redux';
import { ENDPOINT } from '../../config/constants';
import { ACTION } from '../actions';

const initialState = {};
const historyState = { list: [] };

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
  type: 'CALLBACK_FIRED!!!!!'
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
    }, state, Redux.resolveRequestData(action.name, action.data, action.payload));
  case ACTION.REQUEST_REJECT:
    return Object.assign({
    }, state, Redux.rejectRequestData(action.name, action.data, action.error));
  case 'EXECUTE_CALLBACK':
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

/**
 *
 * @param {*} method - Http method for fetch
 * @returns
 */
const getHeaders = () => {
  const headers = {
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
export function epic(action$) {
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
      const method = actionMethods[type];

      // let url = `${state.okapi.url}${data.path}`;
      const url = `${ENDPOINT.BASE_URL}${data.path}?${(data.params)}`;
      const headers = getHeaders();
      const body = JSON.stringify(payload);

      const promise = fetch(url, { method, headers, body })
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      return from(promise)
        .flatMap(response => {
          return of(
            resolveEpicRequest(data.type, data, response),
            executeEpicCallback((cb) ? cb(response) : () => {})
            // cb(response);
          );
        }).catch(errors => of(rejectEpicRequest(errors)));
    });
}
