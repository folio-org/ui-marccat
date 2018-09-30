/* eslint-disable no-unused-vars */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypes } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT, buildUrl } from '../../Utils/Constant';
import LogicalViews from '../models/LogicalViews';

const URL = buildUrl(ENDPOINT.LOGICAL_VIEW_URL, 'lang=ita');

export function fetchLogicalViewsEpic(action$) {
  return action$
    .ofType(ActionTypes.FETCH_LOGICAL_VIEWS)
    .switchMap(() => {
      return ajax
        .getJSON(URL, ENDPOINT.HEADERS)
        .map((data:LogicalViews) => data.views);
    })
    .map(views => marccatActions.fetchLogicalViewsSuccess(views))
    .catch(error => Observable.of(marccatActions.fetchLogicalViewsFailure(error.message)));
}

export function epic(action$, { getState }) {
  const actions = {
    [ActionTypes.FETCH_LOGICAL_VIEWS]: ActionTypes.FETCH_LOGICAL_VIEWS,
  };

  return action$
    .filter(({ type }) => actions[type])
    .mergeMap(({ type, data, payload }) => {
      const state = getState();
      const method = actions[type];
      const request = state.marccat.data;

      return Observable.from(new Promise(() => ({ })));
    });
}
