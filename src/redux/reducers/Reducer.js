import { ACTION } from '../actions/Actions';

const isLoading = false;
const isReady = false;

export function countDocReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ACTION.COUNT_DOC:
    return {
      ...state,
      isLoading: false,
      query: action.payload
    };
  case ACTION.FETCH_COUNTER_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ACTION.COUNT_DOC_SUCCESS:
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
  case ACTION.SEARCH:
    return {
      ...state,
      isReady: false,
      isLoading: false,
      moreData: action.moreData
    };
  case ACTION.FETCH_SEARCH_REQUESTED:
    return {
      ...state,
      isReady: false,
      isLoading: action.payload,
      moreData: action.moreData
    };
  case ACTION.RECORD_SUCCESS:
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
      moreData: action.moreData,
      isReady: true,
    };
  default:
    return state;
  }
}

export function detailsBrowseSearchReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ACTION.DETAILS_BROWSE:
    return {
      ...state,
      isReady: false,
      isLoading: false
    };
  case ACTION.AUTH_DETAILS_BROWSE:
    return {
      ...state,
      isReady: false,
      isLoading: false
    };
  case ACTION.FETCH_DETAILS_BROWSE_REQUESTED:
    return {
      ...state,
      isReady: false,
      isLoading: action.payload,
    };
  case ACTION.DETAILS_BROWSE_SUCCESS:
    return {
      ...state,
      results: action.payload,
      counter: action.count,
      isLoading: false,
      isReady: true,
      isAuthority: action.isAuthority
    };
  case ACTION.AUTH_DETAILS_BROWSE_SUCCESS:
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
  case ACTION.DETAILS:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ACTION.FETCH_DETAILS_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ACTION.DETAILS_BY_TITLE:
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
  case ACTION.ASSOCIATED_DETAILS:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ACTION.FETCH_DETAILS_ASSOCIATED_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ACTION.ASSOCIATED_DETAILS_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
      recordType: action.recType,
      mustOpenPanel: action.isDetailBibAssOpen
    };
  case ACTION.CLOSE_ASSOCIATED_DETAILS:
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
  case ACTION.BROWSE_ASSOCIATED_DETAILS:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ACTION.FETCH_BROWSE_DETAILS_ASSOCIATED_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ACTION.BROWSE_ASSOCIATED_DETAILS_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false,
      isReady: true,
      mustOpenPanel: action.mustOpenPanel
    };
  case ACTION.CLOSE_BROWSE_ASSOCIATED_DETAILS:
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
  case ACTION.ASSOCIATED_BIB_REC:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ACTION.FETCH_ASSOCIATED_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ACTION.ASSOCIATED_BIB_REC_SUCCESS:
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
  case ACTION.BROWSE_FIRST_PAGE:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ACTION.FETCH_BROWSE_FIRST_PAGE:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ACTION.BROWSE_FIRST_PAGE_SUCCESS:
    return {
      ...state,
      records: action.payload,
      query: action.qBib,
      isLoading: false,
      isReady: true,
    };
  default:
    return state;
  }
}

export function recordDeatilReducer(state = { isLoading, isReady }, action) {
  switch (action.type) {
  case ACTION.RECORD_DETAIL:
    return {
      ...state,
      isLoading: false,
      isReady: false
    };
  case ACTION.RECORD_DETAIL_REQUESTED:
    return {
      ...state,
      isLoading: action.payload,
      isReady: false
    };
  case ACTION.RECORD_DETAIL_SUCCESS:
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

export function totalBibCountDocReducer(state = {}, action) {
  switch (action.type) {
  case ACTION.TOTAL_BIB_COUNT:
    return {
      ...state,
    };
  case ACTION.TOTAL_BIB_COUNT_SUCCESS:
    return {
      ...state,
      totalBibDoc: action.payload,
    };
  default:
    return state;
  }
}

export function totalAuthCountDocReducer(state = {}, action) {
  switch (action.type) {
  case ACTION.TOTAL_AUTH_COUNT:
    return {
      ...state,
    };
  case ACTION.TOTAL_AUTH_COUNT_SUCCESS:
    return {
      ...state,
      totalAuthDoc: action.payload,
    };
  default:
    return state;
  }
}

export function filterReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ACTION.FILTERS:
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
  case ACTION.CLOSE_PANELS:
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
  case ACTION.SETTINGS:
    return Object.assign(state, state, action.data);
  default:
    return state;
  }
}
