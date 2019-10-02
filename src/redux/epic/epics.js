/* eslint-disable no-unused-vars */
// TO BE IMPROVE ALL FILES
import { Observable } from 'rxjs';
import { of as of$ } from 'rxjs/observable/of';
import { concat as concat$ } from 'rxjs/observable/concat';
import { map } from 'rxjs/operators/map';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ACTION } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT } from '../../config/constants';
import { fetchFailure } from '../actions/ActionCreator';
import { buildUrl } from '../../shared/utils/Function';
import { TAGS } from '../../components/Cataloguing';
import * as Selector from '../helpers/Selector';
import getHeaders from './epic.js';

export const searchEpic = (action$, store) => action$.ofType(ACTION.SEARCH)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingSearchRequest(true, d.moreData)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.MERGED_SEARCH_URL, `lang=ita&ml=170&qbib=${d.queryBib}&qauth=${d.queryAuth}&from=${d.from}&to=${d.to}&dpo=1&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchSearchEngineRecords(
        d.queryBib,
        d.queryAuth,
        d.to,
        d.moreData,
        record[1].docs,
        record[1].numFound,
        record[0].docs,
        record[0].numFound,
        d.dataOld,
        d.oldBibArray,
        d.oldAuthArray
      ))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const searchDetailEpic = (action$, store) => action$.ofType(ACTION.DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchDetailsRecords(record.docs[0].data, d.recordType))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const associatedBibDetailEpic = (action$, store) => action$.ofType(ACTION.ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchAssociatedBibDetailsRecords(record.docs[0].data, d.recordType, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const searchAssociatedBibRecords = (action$, store) => action$.ofType(ACTION.ASSOCIATED_BIB_REC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=10&dpo=1&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchAssociatedBibRecords(record.docs, d.recordType, d.count))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const countDocEpic = (action$, store) => action$.ofType(ACTION.COUNT_DOC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingCounterRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.DOC_COUNT_URL, `view=1&id=${d.query}`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchCountDocRecords(record.docs[0].data))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const scanBrowsingRecords = (action$, store) => action$.ofType(ACTION.BROWSE_FIRST_PAGE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingScanBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.BROWSE_FIRST_PAGE_URL, `query=${d.query}&view=1&mainLibrary=170&pageSize=30&lang=eng`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchScanBrowsingRecords(record.headings, d.query))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const scanMoreBrowsingRecords = (action$, store) => action$.ofType(ACTION.BROWSE_NEXT_PAGE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingMoreScanBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.BROWSE_NEXT_PAGE, `query=${d.query}&view=1&mainLibrary=170&pageSize=30&lang=eng`), getHeaders(store.getState()))
      .map(record => marccatActions.fetchMoreScanBrowsingRecords(record.headings, d.query, d.oldResults))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseDetailEpic = (action$, store) => action$.ofType(ACTION.DETAILS_BROWSE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL_JSON, `lang=ita&ml=170&q=${d.query}&from=1&to=30&dpo=1`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchBrowseDetail(record.docs, record.numFound, d.isAuthority))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseAuthorityDetailEpic = (action$, store) => action$.ofType(ACTION.AUTH_DETAILS_BROWSE)
  .switchMap((d) => ajax
    .getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=ita&view=-1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), store.getState(), getHeaders(store.getState()))
    .map(record => marccatActions.fetchBrowseAuthorityDetail(record.docs[0].data, d.isAuthority))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const browseDetailAssociatedEpic = (action$, store) => action$.ofType(ACTION.BROWSE_ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseDetailsAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(store.getState(), ENDPOINT.SEARCH_URL, `lang=ita&view=1&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), store.getState(), getHeaders(store.getState()))
      .map(record => marccatActions.fetchBrowseDetailAssociatedRecords(record.docs[0].data, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const totalCountBibEpic = (action$, store) => action$.ofType(ACTION.TOTAL_BIB_COUNT)
  .switchMap((d) => ajax
    .getJSON(buildUrl(store.getState(), ENDPOINT.TOTAL_COUNT_SEARCH_URL, `lang=ita&view=1&ml=170&q=${d.query}&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), store.getState(), getHeaders(store.getState()))
    .map(record => marccatActions.fetchTotalCountBibRecords(record))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const totalCountAuthEpic = (action$, store) => action$.ofType(ACTION.TOTAL_AUTH_COUNT)
  .switchMap((d) => ajax
    .getJSON(buildUrl(store.getState(), ENDPOINT.TOTAL_COUNT_SEARCH_URL, `lang=ita&view=-1&ml=170&q=${d.query}&sortBy=${Selector.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), store.getState(), getHeaders(store.getState()))
    .map(record => marccatActions.fetchTotalCountAuthRecords(record))
    .catch(e => of$(marccatActions.fetchFailure(e))));
