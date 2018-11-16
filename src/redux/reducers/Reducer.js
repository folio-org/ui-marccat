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
  case ActionTypes.FETCH_COUNT_DOC:
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
    };
  case ActionTypes.FETCH_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
    };
  case ActionTypes.RECORD_SUCCESS:
    return {
      ...state,
      records: action.payload,
      count: action.count,
      isLoading: false,
      isReady: true
    };
  default:
    return state;
  }
}

export function searchAuthReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH_AUTH:
    return {
      ...state,
    };
  case ActionTypes.FETCH_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
    };
  case ActionTypes.RECORD_AUTH_SUCCESS:
    return {
      ...state,
      records: action.payload,
      count: action.count,
      isLoading: false,
      isReady: true
    };
  default:
    return state;
  }
}

// TOBE REMOVED
export function getDetailsRecord(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.DETAILS:
    return {
      ...state,
    };
  case ActionTypes.FETCH_DETAIL_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
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
    };
  case ActionTypes.FETCH_ASSOCIATED_DETAILS_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
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
export function getAssociatedBibRecord(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.ASSOCIATED_BIB_REC:
    return {
      ...state,
    };
  case ActionTypes.FETCH_ASSOCIATED_BIB_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
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

