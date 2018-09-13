import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';
import { actionTypes as ActionTypes } from '../actions/Actions';

import {
  fetchLogicalViewsFailure,
  fetchLogicalViewsSuccess
} from '../actions';
import { ENDPOINT } from '../../Utils/Constant';

const url = 'http://127.0.0.1:8080/cataloging/logical-views?lang=ita';

export const searched = {};

export function fetchLogicalViewsEpic(action$) {
  return action$
    .ofType(ActionTypes.FETCH_LOGICAL_VIEWS)
    .switchMap(() => {
      return ajax
        .getJSON(url, ENDPOINT.HEADERS)
        .map(data => data.views);
    })
    .map(views => fetchLogicalViewsSuccess(views))
    .catch(error => Observable.of(fetchLogicalViewsFailure(error.message)));
}
