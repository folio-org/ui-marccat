/* eslint-disable no-unused-vars */
import { of as of$ } from 'rxjs/observable/of';
import { Observable, concat as concat$, merge as merge$ } from 'rxjs/';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypes } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT, buildUrl } from '../../utils/Constant';
import { fetchFailure } from '../actions/ActionCreator';


export const searchEpic = (action$, store) =>
  action$.ofType(ActionTypes.SEARCH)
    .switchMap((d) =>
      merge$(concat$(
        of$(marccatActions.fetchRequested(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchSearchEngineRecords(record.docs)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=-1&ml=2&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
          .map(recordAuth => marccatActions.fetchSearchEngineRecords(recordAuth.docs))
      ))).catch(e => of$(marccatActions.fetchFailure(e)));

// TOBE REMOVED
export const searchDetailEpic = (action$, store) =>
  action$.ofType(ActionTypes.DETAILS)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequestedDetail(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchDetailsRecords(record.docs[0].data))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

export const countDocEpic = (action$, store) =>
  action$.ofType(ActionTypes.COUNT_DOC)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequestedCountDoc(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.DOC_COUNT_URL, `view=1&id=${d.query}`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchCountDocRecords(record.docs[0].data))
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
