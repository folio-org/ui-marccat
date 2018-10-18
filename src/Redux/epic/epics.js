/* eslint-disable no-unused-vars */
import { Observable } from 'rxjs';
import { of as of$ } from 'rxjs/observable/of';
import { concat as concat$ } from 'rxjs/observable/concat';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypes } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT, buildUrl } from '../../Utils/Constant';
import LogicalViews from '../models/LogicalViews';
import { fetchFailure } from '../actions/ActionCreator';

export const searchEpic = (action$, store) =>
  action$.ofType(ActionTypes.SEARCH)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequested(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=10&dpo=1`), ENDPOINT.HEADERS)
          .map((record) => record.docs)
          .map(record => marccatActions.fetchSearchEngineRecords(record))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

export const searchDetailEpic = (action$, store) =>
  action$.ofType(ActionTypes.DETAILS)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequested(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL, 'lang=ita&view=1&ml=170&q=an%20000006570036&from=1&to=1&dpo=1'), ENDPOINT.HEADERS)
          .map((r) => r.docs[0].data)
          .map(k => marccatActions.fetchDetailsRecords(k))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

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
