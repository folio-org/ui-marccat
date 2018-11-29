import { ActionTypes } from '../actions/Actions';

const isLoading = false;
const isReady = false;

export function countDocReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.COUNT_DOC:
    return {
      ...state,
      isLoading: false,
      query: action.payload
    };
  case ActionTypes.FETCH_COUNTER_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ActionTypes.COUNT_DOC_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false
    };
  default:
    return state;
  }
}

export function searchEngineReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH:
    return {
      ...state,
      isReady: false,
      isLoading: false
    };
  case ActionTypes.FETCH_SEARCH_REQUESTED:
    return {
      ...state,
      isReady: false,
      isLoading: action.payload,
    };
  case ActionTypes.RECORD_SUCCESS:
    return {
      ...state,
      bibliographicResults: action.bibliographicResults,
      authorityResults: action.authorityResults,
      bibCounter: action.bibCounter,
      authCounter: action.authCounter,
      isLoading: false,
      isReady: true
    };
  default:
    return state;
  }
}

export function detailsBrowseSearchReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.DETAILS_BROWSE:
    return {
      ...state,
      isReady: false,
      isLoading: false
    };
  case ActionTypes.AUTH_DETAILS_BROWSE:
    return {
      ...state,
      isReady: false,
      isLoading: false
    };
  case ActionTypes.FETCH_DETAILS_BROWSE_REQUESTED:
    return {
      ...state,
      isReady: false,
      isLoading: action.payload,
    };
  case ActionTypes.DETAILS_BROWSE_SUCCESS:
    return {
      ...state,
      results: action.payload,
      counter: action.count,
      isLoading: false,
      isReady: true,
      isAuthority: action.isAuthority
    };
  case ActionTypes.AUTH_DETAILS_BROWSE_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
      isAuthority: action.isAuthority
    };
  default:
    return state;
  }
}

export function getDetailsRecord(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.DETAILS:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_DETAILS_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.DETAILS_BY_TITLE:
    return {
      ...state,
      records: action.payload,
      recordType: action.recType,
      isLoading: false,
      isReady: true
    };
  default:
    return state;
  }
}

export function detailsAssociatedReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.ASSOCIATED_DETAILS:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_DETAILS_ASSOCIATED_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.ASSOCIATED_DETAILS_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
      recordType: action.recType,
      mustOpenPanel: action.isDetailBibAssOpen
    };
  case ActionTypes.CLOSE_ASSOCIATED_DETAILS:
    return {
      ...state,
      mustOpenPanel: action.openPanel
    };
  default:
    return state;
  }
}

export function browseDetailsAssociatedReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.BROWSE_ASSOCIATED_DETAILS:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_BROWSE_DETAILS_ASSOCIATED_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.BROWSE_ASSOCIATED_DETAILS_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
      mustOpenPanel: action.mustOpenPanel
    };
  case ActionTypes.CLOSE_BROWSE_ASSOCIATED_DETAILS:
    return {
      ...state,
      mustOpenPanel: action.openPanel
    };
  default:
    return state;
  }
}

export function getAssociatedBibRecord(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.ASSOCIATED_BIB_REC:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_ASSOCIATED_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.ASSOCIATED_BIB_REC_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
      recordType: action.recType,
      count: action.countDoc
    };
  default:
    return state;
  }
}

export function scanBrowsingReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.BROWSE_FIRST_PAGE:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_BROWSE_FIRST_PAGE:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.BROWSE_FIRST_PAGE_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
    };
  default:
    return state;
  }
}

export function filterReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.FILTERS:
    return {
      ...state,
      filters: action.payload,
      name: action.filterName,
      checked: action.filterChecked
    };
  default:
    return state;
  }
}
