import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { Redux } from '../helpers/Redux';
import {
  ACTION,
  REQUEST_MAKE,
  REQUEST_RESOLVE,
  REQUEST_REJECT,
} from '../../shared';
import { ENDPOINT } from '../../config/constants';
import { ActionTypes } from '../actions/Actions';

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
export function reducer(state = initialState, action) {
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
  case ActionTypes.TOTAL_BIB_COUNT_SUCCESS:
    state.list[state.list.length - 1].found = action.payload;
    return state;
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
// eslint-disable-next-line no-unused-vars
export function epic(action$, { getState }) {
  const actionMethods = {
    [ACTION.QUERY]: 'GET',
    [ACTION.FIND]: 'GET',
    [ACTION.UPDATE]: 'PUT',
    [ACTION.SAVE]: 'POST',
    [ACTION.CREATE]: 'POST',
    [ACTION.DELETE]: 'DELETE',
    [ACTION.LOCK]: 'LOCK',
    [ACTION.UNLOCK]: 'UNLOCK',
  };

  return action$
    .filter(({ type }) => actionMethods[type])
    .mergeMap(({ type, data, payload }) => {
      const method = actionMethods[type];

      // let url = `${state.okapi.url}${data.path}`;
      const url = `${ENDPOINT.BASE_URL}${data.path}?${(data.params)}`;
      const headers = getHeaders();
      const body = JSON.stringify(payload);

      const promise = fetch(url, { method, headers, body })
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      return from(promise)
        .map(response => resolveEpicRequest(data.type, data, response))
        .catch(errors => of(rejectEpicRequest(errors)));
    });
}
