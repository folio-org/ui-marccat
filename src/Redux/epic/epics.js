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

export function fetchSearchEngineRecords(action$) {
  return action$
    .ofType(ActionTypes.SEARCH)
    .switchMap((data) => {
      return ajax
        .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=1&ml=170&q=${data.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
        .map((records) => records.docs);
    })
    .map(records => marccatActions.fetchSearchEngineRecords(records));
}

export function fetchScanBrowsingRecords(action$) {
  return action$
    .ofType(ActionTypes.SCAN)
    .switchMap((data) => {
      return ajax
        .getJSON(buildUrl(ENDPOINT.BROWSING_FIRST_PAGE, `query=${data.query}&view=1&mainLibrary=170&pageSize=10&lang=eng`), ENDPOINT.HEADERS)
        .map((records) => records.headings);
    })
    .map(records => marccatActions.fetchScanBrowsingRecords(records));
}

export function fetchDetailsRecords(action$) {
  return action$
    .ofType(ActionTypes.DETAILS)
    .switchMap((data) => {
      return ajax
        .getJSON(buildUrl(ENDPOINT.SEARCH_URL, 'lang=ita&view=1&ml=170&q=an%20000006570036&from=1&to=1&dpo=1'), ENDPOINT.HEADERS)
        .map((records) => records.docs[0].data);
    })
    .map(records => marccatActions.fetchDetailsRecords(records));
}
