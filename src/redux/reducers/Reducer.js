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
      isLoading: false,
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
      queryBib: action.queryBib,
      queryAuth: action.queryAuth,
      to: action.to,
      bibliographicResults: action.bibliographicResults,
      authorityResults: action.authorityResults,
      bibCounter: action.bibCounter,
      authCounter: action.authCounter,
      dataOld: action.dataOld,
      oldBibArray:action.oldBibArray,
      oldAuthArray: action.oldAuthArray,
      isLoading: false,
      isReady: true,
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

export function templateViewReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.VIEW_TEMPLATE:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.TEMPLATE_GET_BY_ID:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_VIEW_TEMPLATE:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.FETCH_TEMPLATE_GET_BY_ID:
    return {
      ...state,
      isLoading: action.payload,
      default: action.payload.name,
      isReady: false
    };
  case ActionTypes.VIEW_TEMPLATE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isReady: true,
      records: action.payload,
      default: action.payload.name
    };
  case ActionTypes.TEMPLATE_GET_BY_ID_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isReady: true,
      recordsById: action.payload,
    };
  default:
    return state;
  }
}

export function headerTypes006Reducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.HEADER_TYPES_006:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_HEADER_TYPES_006:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.HEADER_TYPES_006_SUCCESS:
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

export function headerTypes007Reducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.HEADER_TYPES_007:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_HEADER_TYPES_007:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.HEADER_TYPES_007_SUCCESS:
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

export function headerTypes008Reducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.HEADER_TYPES_008:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_HEADER_TYPES_008:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.HEADER_TYPES_008_SUCCESS:
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

export function tag006ValuesReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.VALUES_FROM_TAG_006:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_VALUES_FROM_TAG_006:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.VALUES_FROM_TAG_006_SUCCESS:
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

export function tag007ValuesReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.VALUES_FROM_TAG_007:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_VALUES_FROM_TAG_007:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.VALUES_FROM_TAG_007_SUCCESS:
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
export function tag008ValuesReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.VALUES_FROM_TAG_008:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_VALUES_FROM_TAG_008:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.VALUES_FROM_TAG_008_SUCCESS:
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

export function headingByTagReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.FETCH_HEADING_BY_TAG:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_HEADING_TAG:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.FETCH_HEADING_BY_TAG_SUCCESS:
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

export function recordDeatilReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.RECORD_DETAIL:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.RECORD_DETAIL_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.RECORD_DETAIL_SUCCESS:
    return {
      ...state,
      record: action.payload,
      isLoading: false,
      isReady: true,
    };
  default:
    return state;
  }
}

export function leaderReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ActionTypes.LEADER_VALUES_FROM_TAG:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ActionTypes.FETCH_LEADER_VALUES_FROM_TAG:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ActionTypes.LEADER_VALUES_FROM_TAG_SUCCESS:
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
      checked: action.isChecked
    };
  default:
    return state;
  }
}

export function panelsReducer(state = {}, action) { // TO BE REMOVED
  switch (action.type) {
  case ActionTypes.CLOSE_PANELS:
    return {
      ...state,
      closePanels: action.closePanels
    };
  default:
    return state;
  }
}

export function settingsReducer(state = {}, action) {
  switch (action.type) {
  case ActionTypes.SETTINGS:
    return Object.assign(state, state, action.data);
  case ActionTypes.SEARCH:
    return {
      ...state,
      queryBib: action.queryBib,
      queryAuth: action.queryAuth,
    };
  default:
    return state;
  }
}
