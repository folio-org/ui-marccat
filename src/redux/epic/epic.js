import { Observable } from 'rxjs/Observable';
import { qs } from '..';
import { ENDPOINT } from '../../utils/Constant';
import { StoreReducer } from '../helpers/StoreReducer';

// action types
export const REQUEST_MAKE = '@@ui-marccat/REQUEST_MAKE';
export const REQUEST_RESOLVE = '@@ui-marccat/REQUEST_RESOLVE';
export const REQUEST_REJECT = '@@ui-marccat/REQUEST_REJECT';
export const REQUEST_CLEAR = '@@ui-marccat/REQUEST_CLEAR';

// actions
export const actionTypes = {
  SEARCH: '@@ui-marccat/SEARCH',
  BROWSE: '@@ui-marccat/BROWSE',
  QUERY: '@@ui-marccat/QUERY',
  FIND: '@@ui-marccat/FIND',
  SAVE: '@@ui-marccat/SAVE',
  CREATE: '@@ui-marccat/CREATE',
  DELETE: '@@ui-marccat/DELETE',
  RESOLVE: '@@ui-marccat/RESOLVE',
  REJECT: '@@ui-marccat/REJECT',
  LOCK: '@@ui-marccat/LOCK',
  UNLOCK: '@@ui-marccat/UNLOCK',
};

/**
 * Action creator for querying a set of records
 * @param {String} type - resource type
 * @param {Object} params - query params
 * @param {String} options.path - path to use for the query
 */
export const query = (type, params, { path }) => ({
  type: actionTypes.QUERY,
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  }
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
  case REQUEST_RESOLVE:
    return Object.assign({}, state, StoreReducer.createDataStore(action.name, action.data, action.payload));
  case REQUEST_REJECT:
    return Object.assign({}, state, StoreReducer.createDataStore(action.name, action.data, action.error));
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
    [actionTypes.QUERY]: 'GET',
    [actionTypes.FIND]: 'GET',
    [actionTypes.SAVE]: 'PUT',
    [actionTypes.CREATE]: 'POST',
    [actionTypes.LOCK]: 'LOCK',
    [actionTypes.UNLOCK]: 'UNLOCK',
    [actionTypes.DELETE]: 'DELETE'
  };

  return action$
    .filter(({ type }) => actionMethods[type])
    .mergeMap(({ type, data, payload }) => {
      const state = getState();
      const method = actionMethods[type];

      // the request object created from this action
      // const request = state.marccat[data.type].requests[data.timestamp];

      // used for the actual request
      // let url = `${state.okapi.url}${data.path}`;
      let url = `${ENDPOINT.BASE_URL}${data.path}`;
      const headers = StoreReducer.getHeaders(method, state);
      let body;

      if (type === actionTypes.QUERY && Object.keys(data.params).length !== 0) {
        url = `${url}?${(data.params)}`;
      }

      if (data.params.include) {
        let include = data.params.include;
        include = Array.isArray(include) ? include.join(',') : include;
        url = `${url}?${qs.stringify({ include })}`;
      }

      // When PUTing, the payload needs to be stringified
      if (method === 'PUT' || method === 'POST') {
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
