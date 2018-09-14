/* eslint-disable */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ActionTypes } from '../actions/Actions';


// reducer handlers
const handlers = {};

/**
 * Helper for creating headers when making a request
 * @param {String} method - request method
 * @param {String} state.okapi.tenant - the Okapi tenant
 * @param {String} state.okapi.token - the Okapi user token
 * @returns {Object} headers for a new request
 */
const getHeaders = (method, { okapi }) => {
  const headers = {
    'X-Okapi-Tenant': okapi.tenant,
    'X-Okapi-Token': okapi.token
  };

  if (method === 'PUT' || method === 'POST') {
    headers['Content-Type'] = 'application/vnd.api+json';
  }

  return headers;
};

/**
 * Sometimes the response from the server (or mirage) does not include a
 * body (null). This causes `response.json()` to error with something like
 * "unexpected end of input". This workaround uses `response.text()` and
 * when there are any errors parsing it using `JSON.parse`, the text is
 * returned instead.
 */
const parseResponseBody = (response) => {
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

/**
 * The main data store reducer simply uses the handlers defined above
 * @param {Object} state - data store state leaf
 * @param {Object} action - redux action being dispatched
 */
export function reducer(state = {}, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  } else {
    return state;
  }
}

export function search(actions$,{ getState }){
  return actions$
    .ofType(ActionTypes.FIND)
    .mergeMap(action => {
    
      const request = state.marccat.data[data.type].requests[data.timestamp];

      const promise = fetch(url)
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      // an observable from resolving or rejecting the request payload
      return Observable.from(promise)
        .map(responseBody => resolve(request, responseBody, payload))
        .catch(errors => Observable.of(reject(request, errors, data)));
      }
    );
  }
/**
 * The epic used to actually make a requests when an action is dispatched
 * @param {Observable} action$ - the observable action
 * @param {Function} store.getState - get's the most recent redux state
 */
export function epic(action$, { getState }) {
  const actionMethods = {
    [ActionTypes.QUERY]: 'GET',
    [ActionTypes.FIND]: 'GET',
    [ActionTypes.SAVE]: 'PUT',
    [ActionTypes.CREATE]: 'POST',
    [ActionTypes.DELETE]: 'DELETE'
  };

  return action$
    .filter(({ type }) => actionMethods[type])
    .mergeMap(({ type, data, payload }) => {
      const state = getState();
      const method = actionMethods[type];

      const request = state.marccat.data[data.type].requests[data.timestamp];


      // request which rejects when not OK
      const promise = fetch(url, { headers, method, body })
        .then(response => Promise.all([response.ok, parseResponseBody(response)]))
        .then(([ok, body]) => (ok ? body : Promise.reject(body.errors))); // eslint-disable-line no-shadow

      // an observable from resolving or rejecting the request payload
      return Observable.from(promise)
        .map(responseBody => resolve(request, responseBody, payload))
        .catch(errors => Observable.of(reject(request, errors, data)));
    });
}


const initialState = {
  views: undefined,
  isLoading: false,
  error: null
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
      case ActionTypes.FETCH_LOGICAL_VIEWS:
          return {
              ...state,
              isLoading: true,
              error: null
          };
      case ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS:
          return {
              views: action.payload,
              isLoading: false,
              error: null
          };
      case ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE:
          return {
              views: [{}],
              isLoading: false,
              error: action.payload
          };
      default:
          return state;
  }
}
