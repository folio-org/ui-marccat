import { actionTypes as ActionTypes } from './Actions';

/* MARCCAT ACTIONS CREATOR */

/**
 *
 * @param {*} query
 * @return {*} search Action
 */
export function search(query) {
  return {
    type: ActionTypes.SEARCH, // FOR ADVANCED SEARCH
    payload: {
      query
    }
  };
}

/**
 *
 * @return {*} clear search reult Action
 */
export function clearSearchResults() {
  return {
    type: ActionTypes.CLEAR_SEARCH_RESULTS
  };
}

/**
 *
 * @param {*} copiedChar
 * @return {*} diacritic copied char Action
 */
export function sendDiacriticChar(copiedChar) {
  return {
    type: ActionTypes.DIACRITIC_CHAR, // FOR DIACRITIC
    payload: {
      copiedChar
    }
  };
}
