import { ActionTypes } from '../actions/Actions';

const isLoading = false;
const isLoadingDetail = false;

const filter = {
  recordType: undefined,
  suppressed: undefined,
  language: undefined,
  format: undefined
};


export function searchEngineReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.FETCH_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ActionTypes.RECORD_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false
    };
  default:
    return state;
  }
}

export function searchAuthReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH_AUTH:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.FETCH_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ActionTypes.RECORD_AUTH_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false
    };
  default:
    return state;
  }
}

// TOBE REMOVED
export function getDetailsRecord(state = { isLoadingDetail }, action) {
  switch (action.type) {
  case ActionTypes.DETAILS:
    return {
      ...state,
      isLoadingDetail: false,
      query: action.payload
    };
  case ActionTypes.FETCH_DETAIL_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoadingDetail: true
    };
  case ActionTypes.DETAILS_BY_TITLE:
    return {
      ...state,
      records: action.payload,
      isLoadingDetail: false
    };
  default:
    return state;
  }
}

export function scanBrowsingReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.SCAN:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.SCAN_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  default:
    return state;
  }
}

export function filterReducer(state = { filter }, action) {
  switch (action.type) {
  case ActionTypes.FILTERS:
    return {
      ...state,
      filters: action.payload,
    };
  /*
  case ActionTypes.TYPE_FILTER:
    return {
      ...state,
      checked: action.inUse,
      recordType: action.payload,
    };
  case ActionTypes.SUPPRESSED_FILTER:
    return {
      ...state,
      checked: action.inUse,
      suppressed: action.payload,
    };
  case ActionTypes.LANGUAGE_FILTER:
    return {
      ...state,
      checked: action.inUse,
      language: action.payload,
    };
  case ActionTypes.FORMAT_FILTER:
    return {
      ...state,
      checked: action.inUse,
      format: action.payload,
    };
    */
  default:
    return state;
  }
}

