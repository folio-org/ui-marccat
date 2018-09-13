import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_LOGICAL_VIEWS,
  fetchLogicalViewsFailure,
  fetchLogicalViewsSuccess
} from '../actions';
import { ENDPOINT } from '../../Utils/Constant';

const url = 'http://127.0.0.1:8080/cataloging/logical-views?lang=ita'; // The API for the whiskies

export const searched = {};

export function fetchLogicalViewsEpic(action$) { // action$ is a stream of actions
  // action$.ofType is the outer Observable
  return action$
    .ofType(FETCH_LOGICAL_VIEWS)
    .switchMap(() => {
      // ajax calls from Observable return observables. This is how we generate the inner Observable
      return ajax
        .getJSON(url, ENDPOINT.HEADERS) // getJSON simply sends a GET request with Content-Type application/json
        .map(data => data.views);
    })
    .map(views => fetchLogicalViewsSuccess(views)) // map the resulting array to an action of type FETCH_WHISKIES_SUCCESS
  // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
  // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
    .catch(error => Observable.of(fetchLogicalViewsFailure(error.message)));
}
