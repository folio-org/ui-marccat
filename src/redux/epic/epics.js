/* eslint-disable no-unused-vars */
// TO BE IMPROVE ALL FILES
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of as of$ } from 'rxjs/observable/of';
import { concat as concat$ } from 'rxjs/observable/concat';
import { map } from 'rxjs/operators/map';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ACTION } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT } from '../../config/constants';
import { fetchFailure } from '../actions/ActionCreator';
import { buildUrl, parseResponse } from '../../shared/utils/Function';
import { TAGS } from '../../components/Cataloguing';
import { getHeaders } from './epic';
import * as Selector from '../helpers/Selector';


function getJSON(url, headers) {
  // 1. rxjs v5 ajax call
  return ajax({
    url,
    headers,
    crossDomain: true,
    withCredentials: false,
    responseType: 'json',
    method: 'GET',
    createXHR: () => new XMLHttpRequest(),
  });

  // 2. or regular fetch turning into Observable
  // return fromPromise(fetch(url, { headers }));
}

export const searchEpic = (action$, store) => action$.ofType(ACTION.SEARCH)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingSearchRequest(true, d.moreData, d.isFromCat)),
    getJSON(buildUrl(store.getState(), ENDPOINT.MERGED_SEARCH_URL, `lang=eng&ml=170&qbib=${d.queryBib}&qauth=${d.queryAuth}&from=${d.from}&to=${d.to}&dpo=1&sortBy=${d.isFromCat === 'Y' ? 54 : Selector.get(store, 'settings', 'sortType')}&sortOrder=0`), getHeaders(store.getState()))
      .map((record) => {
        const aJsonResponse = parseResponse(record.response);
        return marccatActions.fetchSearchEngineRecords(
          d.queryBib,
          d.queryAuth,
          d.to,
          d.isFromCat,
          d.moreData,
          aJsonResponse[1].docs,
          aJsonResponse[1].numFound,
          aJsonResponse[0].docs,
          aJsonResponse[0].numFound,
          d.dataOld,
          d.oldBibArray,
          d.oldAuthArray
        );
      }).catch(e => of$(marccatActions.fetchFailure(e)))
  ));

// Para b�squedas Search
export const searchBibEpic = (action$, store) => action$.ofType(ACTION.SEARCHBIB)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingSearchRequest(true, d.moreData, d.isFromCat)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_BIB_URL, `lang=eng&ml=170&q=${d.queryBib}&from=${d.from}&to=${d.to}&dpo=1&sortBy=${d.isFromCat === 'Y' ? 54 : Selector.get(store, 'settings', 'sortType')}&sortOrder=0`), getHeaders(store.getState()))
      .map((record) => {
        const aJsonResponse = parseResponse(record.response);
        return marccatActions.fetchSearchEngineRecordsBibAut(
          d.queryBib,
          d.queryAuth,
          d.to,
          d.isFromCat,
          d.moreData,
          aJsonResponse.docs,
          aJsonResponse.numFound,
          [],
          0,
          d.dataOld,
          d.oldBibArray,
          d.oldAuthArray,
          true,
          false
        );
      }).catch(e => of$(marccatActions.fetchFailure(e)))
  ));

// Para b�squedas Authority
export const searchAuthEpic = (action$, store) => action$.ofType(ACTION.SEARCHAUTH)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingSearchRequest(true, d.moreData, d.isFromCat)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_AUTH_URL, `lang=eng&ml=170&q=${d.queryAuth}&from=${d.from}&to=${d.to}&dpo=1&sortBy=${d.isFromCat === 'Y' ? 54 : Selector.get(store, 'settings', 'sortType')}&sortOrder=0`), getHeaders(store.getState()))
      .map((record) => {
        const aJsonResponse = parseResponse(record.response);
        return marccatActions.fetchSearchEngineRecordsBibAut(
          d.queryBib,
          d.queryAuth,
          d.to,
          d.isFromCat,
          d.moreData,
          [],
          0,
          aJsonResponse.docs,
          aJsonResponse.numFound,
          d.dataOld,
          d.oldBibArray,
          d.oldAuthArray,
          false,
          true
        );
      }).catch(e => of$(marccatActions.fetchFailure(e)))
  ));

export const searchDetailEpic = (action$, store) => action$.ofType(ACTION.DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=eng&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchDetailsRecords(parseResponse(record.response).docs[0].data, d.recordType))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const associatedBibDetailEpic = (action$, store) => action$.ofType(ACTION.ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsAssociatedRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=eng&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchAssociatedBibDetailsRecords(parseResponse(record.response).docs[0].data, d.recordType, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const searchAssociatedBibRecords = (action$, store) => action$.ofType(ACTION.ASSOCIATED_BIB_REC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingAssociatedRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL_JSON, `lang=eng&view=1&ml=170&q=${d.query}&from=1&to=10&dpo=1&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchAssociatedBibRecords(record.docs, d.recordType, d.count))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const countDocEpic = (action$, store) => action$.ofType(ACTION.COUNT_DOC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingCounterRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.DOC_COUNT_URL, `view=1&id=${d.query}`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchCountDocRecords(record.docs[0].data))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const scanBrowsingRecords = (action$, store) => action$.ofType(ACTION.BROWSE_FIRST_PAGE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingScanBrowseRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.BROWSE_FIRST_PAGE_URL, `query=${d.query}&view=1&mainLibrary=170&pageSize=30&lang=eng`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchScanBrowsingRecords(parseResponse(record.response).headings, d.query))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseDetailEpic = (action$, store) => action$.ofType(ACTION.DETAILS_BROWSE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL_JSON, `lang=eng&ml=170&q=${d.query}&from=1&to=30&dpo=1`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchBrowseDetail(parseResponse(record.response).docs, record.response.numFound, d.isAuthority))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseAuthorityDetailEpic = (action$, store) => action$.ofType(ACTION.AUTH_DETAILS_BROWSE)
  .switchMap((d) => getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=eng&view=-1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), getHeaders(store.getState()))
    .map(record => marccatActions.fetchBrowseAuthorityDetail(parseResponse(record.response).docs[0].data, d.isAuthority))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const browseDetailAssociatedEpic = (action$, store) => action$.ofType(ACTION.BROWSE_ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseDetailsAssociatedRequest(true)),
    getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=eng&view=1&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchBrowseDetailAssociatedRecords(parseResponse(record.response).docs[0].data, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const totalCountBibEpic = (action$, store) => action$.ofType(ACTION.TOTAL_BIB_COUNT)
  .switchMap((d) => getJSON(buildUrl(store.getState(), ENDPOINT.TOTAL_COUNT_SEARCH_URL, `lang=eng&view=1&ml=170&q=${d.query}&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), getHeaders(store.getState()))
    .map(record => marccatActions.fetchTotalCountBibRecords(record.response))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const totalCountAuthEpic = (action$, store) => action$.ofType(ACTION.TOTAL_AUTH_COUNT)
  .switchMap((d) => getJSON(buildUrl(store.getState(), ENDPOINT.TOTAL_COUNT_SEARCH_URL, `lang=eng&view=-1&ml=170&q=${d.query}&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), getHeaders(store.getState()))
    .map(record => marccatActions.fetchTotalCountAuthRecords(record.response))
    .catch(e => of$(marccatActions.fetchFailure(e))));
