/* eslint-disable no-unused-vars */
// TO BE IMPROVE ALL FILES
import { Observable } from 'rxjs';
import { of as of$ } from 'rxjs/observable/of';
import { concat as concat$ } from 'rxjs/observable/concat';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypes } from '../actions/Actions';
import * as marccatActions from '../actions';
import { buildUrl } from '../helpers';
import { ENDPOINT } from '../../utils/Constant';
import { fetchFailure } from '../actions/ActionCreator';

export const searchEpic = (action$, store) => action$.ofType(ActionTypes.SEARCH)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingSearchRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.MERGED_SEARCH_URL, `lang=ita&ml=170&qbib=${d.queryBib}&qauth=${d.queryAuth}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchSearchEngineRecords(
        record[1].docs,
        record[1].numFound,
        record[0].docs,
        record[0].numFound,
      ))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const searchDetailEpic = (action$, store) => action$.ofType(ActionTypes.DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchDetailsRecords(record.docs[0].data, d.recordType))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const associatedBibDetailEpic = (action$, store) => action$.ofType(ActionTypes.ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingDetailsAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchAssociatedBibDetailsRecords(record.docs[0].data, d.recordType, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const searchAssociatedBibRecords = (action$, store) => action$.ofType(ActionTypes.ASSOCIATED_BIB_REC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=10&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchAssociatedBibRecords(record.docs, d.recordType, d.count))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const countDocEpic = (action$, store) => action$.ofType(ActionTypes.COUNT_DOC)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingCounterRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.DOC_COUNT_URL, `view=1&id=${d.query}`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchCountDocRecords(record.docs[0].data))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const scanBrowsingRecords = (action$, store) => action$.ofType(ActionTypes.BROWSE_FIRST_PAGE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingScanBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.BROWSE_FIRST_PAGE_URL, `query=${d.query}&view=1&mainLibrary=170&pageSize=20&lang=eng`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchScanBrowsingRecords(record.headings))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseDetailEpic = (action$, store) => action$.ofType(ActionTypes.DETAILS_BROWSE)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchBrowseDetail(record.docs, record.numFound, d.isAuthority))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const browseAuthorityDetailEpic = (action$, store) => action$.ofType(ActionTypes.AUTH_DETAILS_BROWSE)
  .switchMap((d) => ajax
    .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=-1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
    .map(record => marccatActions.fetchBrowseAuthorityDetail(record.docs[0].data, d.isAuthority))
    .catch(e => of$(marccatActions.fetchFailure(e))));

export const browseDetailAssociatedEpic = (action$, store) => action$.ofType(ActionTypes.BROWSE_ASSOCIATED_DETAILS)
  .switchMap((d) => concat$(
    of$(marccatActions.isfetchingBrowseDetailsAssociatedRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=1&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchBrowseDetailAssociatedRecords(record.docs[0].data, d.mustOpenPanel))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const templateViewEpic = (action$, store) => action$.ofType(ActionTypes.VIEW_TEMPLATE)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTemplateViewRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.VIEW_TEMPLATE_URL, 'type=B&lang=ita'), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchTemplateView(record.recordTemplates))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const templateByIdEpic = (action$, store) => action$.ofType(ActionTypes.TEMPLATE_GET_BY_ID)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTemplateByIdRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.EMPTY_RECORD_URL + `${d.query}`, 'view=1&lang=ita'), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchTemplateById(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const leaderEpic = (action$, store) => action$.ofType(ActionTypes.LEADER_VALUES_FROM_TAG)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingLeaderTagRequest(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.TEMPLATE_TAG_URL, `leader=${d.leader}&code=${d.code}&headerTypeCode=${d.typeCode}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchLeaderFromTag(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const headerTypes006Epic = (action$, store) => action$.ofType(ActionTypes.HEADER_TYPES_006)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingHeaderTypes006(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.HEADER_TYPES_URL, `code=${d.code}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchHeaderTypes006(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const headerTypes007Epic = (action$, store) => action$.ofType(ActionTypes.HEADER_TYPES_007)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingHeaderTypes007(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.HEADER_TYPES_URL, `code=${d.code}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchHeaderTypes007(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const headerTypes008Epic = (action$, store) => action$.ofType(ActionTypes.HEADER_TYPES_008)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingHeaderTypes008(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.HEADER_TYPES_URL, `code=${d.code}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchHeaderTypes008(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const tag006ValuesEpic = (action$, store) => action$.ofType(ActionTypes.VALUES_FROM_TAG_006)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTag006Request(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.TEMPLATE_TAG_URL, `leader=${d.leader}&code=${d.code}&headerTypeCode=${d.typeCode}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchValuesFromTag006(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const tag007ValuesEpic = (action$, store) => action$.ofType(ActionTypes.VALUES_FROM_TAG_007)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTag007Request(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.TEMPLATE_TAG_URL, `leader=${d.leader}&code=${d.code}&headerTypeCode=${d.typeCode}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchValuesFromTag007(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const tag008ValuesEpic = (action$, store) => action$.ofType(ActionTypes.VALUES_FROM_TAG_008)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingTag008Request(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.TEMPLATE_TAG_URL, `leader=${d.leader}&code=${d.code}&headerTypeCode=${d.typeCode}&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchValuesFromTag008(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));

export const headingSuggestionEpic = (action$, store) => action$.ofType(ActionTypes.FETCH_HEADING_TAG)
  .switchMap((d) => concat$(
    of$(marccatActions.isFetchingHeadingByTag(true)),
    ajax
      .getJSON(buildUrl(ENDPOINT.HEADING_BY_TAG, `tag=${d.tag || 245}&indicator1=${1}&indicator2=${0}&stringText=${d.query || 'Manzoni'}&view=1&mainLibrary=170&pageSize=20&lang=ita`), ENDPOINT.HEADERS)
      .map(record => marccatActions.fetchHeadingByTag(record))
      .catch(e => of$(marccatActions.fetchFailure(e))),
  ));
