import { actionTypes as ActionTypes } from './Actions';

/* MARCCAT ACTIONS CREATOR */

export function search(query) {
  return {
    type: ActionTypes.SEARCH, // FOR ADVANCED SEARCH
    payload: {
      query
    }
  };
}

export function clearSearchResults() {
  return {
    type: ActionTypes.CLEAR_SEARCH_RESULTS
  };
}

export function sendDiacriticChar(copiedChar) {
  return {
    type: ActionTypes.DIACRITIC_CHAR, // FOR ADVANCED SEARCH
    payload: {
      copiedChar
    }
  };
}
