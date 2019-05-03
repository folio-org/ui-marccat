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
import { Redux } from '..';
import { buildUrl } from '../../utils/Function';
import { TAGS } from '../../components/Cataloguing';

export const searchEpic = (action$, store) => action$.ofType(ACTION.SEARCH)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingSearchRequest(true, d.moreData)),
    ajax
      .getJSON(buildUrl(ENDPOINT.MERGED_SEARCH_URL, `lang=ita&ml=170&qbib=${d.queryBib}&qauth=${d.queryAuth}&from=${d.from}&to=${d.to}&dpo=1&sortBy=${Redux.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), ENDPOINT.HEADERS)
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
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchDetailsRecords(record.docs[0].data, d.recordType))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const associatedBibDetailEpic = (action$, store) => action$.ofType(ACTION.ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchAssociatedBibDetailsRecords(record.docs[0].data, d.recordType, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const searchAssociatedBibRecords = (action$, store) => action$.ofType(ACTION.ASSOCIATED_BIB_REC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=10&dpo=1&sortBy=${Redux.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchAssociatedBibRecords(record.docs, d.recordType, d.count))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const countDocEpic = (action$, store) => action$.ofType(ACTION.COUNT_DOC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingCounterRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.DOC_COUNT_URL, `view=1&id=${d.query}`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchCountDocRecords(record.docs[0].data))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const scanBrowsingRecords = (action$, store) => action$.ofType(ACTION.BROWSE_FIRST_PAGE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingScanBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.BROWSE_FIRST_PAGE_URL, `query=${d.query}&view=1&mainLibrary=170&pageSize=20&lang=eng`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchScanBrowsingRecords(record.headings))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseDetailEpic = (action$, store) => action$.ofType(ACTION.DETAILS_BROWSE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchBrowseDetail(record.docs, record.numFound, d.isAuthority))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseAuthorityDetailEpic = (action$, store) => action$.ofType(ACTION.AUTH_DETAILS_BROWSE)
  .switchMap((d) => ajax
    .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=-1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
    .map(record => marccatActions.fetchBrowseAuthorityDetail(record.docs[0].data, d.isAuthority))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const browseDetailAssociatedEpic = (action$, store) => action$.ofType(ACTION.BROWSE_ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseDetailsAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=1&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchBrowseDetailAssociatedRecords(record.docs[0].data, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const templateViewEpic = (action$, store) => action$.ofType(ACTION.VIEW_TEMPLATE)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTemplateViewRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.VIEW_TEMPLATE_URL, 'type=B&lang=ita'), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchTemplateView(record.recordTemplates))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const templateByIdEpic = (action$, store) => action$.ofType(ACTION.TEMPLATE_GET_BY_ID)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTemplateByIdRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.VIEW_TEMPLATE_URL_BY_ID + `${d.query}`, ENDPOINT.DEFAULT_LANG_VIEW), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchTemplateById(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const leaderEpic = (action$, store) => action$.ofType(ACTION.LEADER_VALUES_FROM_TAG)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingLeaderTagRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.TEMPLATE_TAG_URL, `leader=${d.leader}&code=${d.code}&headerTypeCode=${d.typeCode}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchLeaderFromTag(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));


export const headerTypes008Epic = (action$, store) => action$.ofType(ACTION.HEADER_TYPES_008)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingHeaderTypes008(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.HEADER_TYPES_URL, `code=${d.code}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchHeaderTypes008(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const tag008ValuesEpic = (action$, store) => action$.ofType(ACTION.VALUES_FROM_TAG_008)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTag008Request(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.TEMPLATE_TAG_URL, `leader=${d.leader}&code=${d.code}&headerTypeCode=${d.typeCode}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchValuesFromTag008(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const tag008ByLeaderEpic = (action$, store) => action$.ofType(ACTION.CHANGE_008_BY_LEADER)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTag008ByLeaderRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.CHANGE_008_BY_LEADER, `leader=${d.leader}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchValuesTag008ByLeader(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));
export const totalCountBibEpic = (action$, store) => action$.ofType(ACTION.TOTAL_BIB_COUNT)
  .switchMap((d) => ajax
    .getJSON(buildUrl(ENDPOINT.TOTAL_COUNT_SEARCH_URL, `lang=ita&view=1&ml=170&q=${d.query}&sortBy=${Redux.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), ENDPOINT.HEADERS)
    .map(record => marccatActions.fetchTotalCountBibRecords(record))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const totalCountAuthEpic = (action$, store) => action$.ofType(ACTION.TOTAL_AUTH_COUNT)
  .switchMap((d) => ajax
    .getJSON(buildUrl(ENDPOINT.TOTAL_COUNT_SEARCH_URL, `lang=ita&view=-1&ml=170&q=${d.query}&sortBy=${Redux.get(store, 'settings', 'sortType') || 4}&sortOrder=0`), ENDPOINT.HEADERS)
    .map(record => marccatActions.fetchTotalCountAuthRecords(record))
    .catch(e => of$(marccatActions.fetchFailure(e))));
