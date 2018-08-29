import { reduxActionTypes, actionTypes as ActionTypes } from '../actions/Actions';
/**
 * The form store reducer
 * @param {Object} state - data store state leaf
 * @param {Object} action - redux action being dispatched
 */
export default function formReducer(state = {}, action = null) {
  switch (action.type) {
  case reduxActionTypes.REDUX_FORM_CHANGE:
    return Object.assign({}, state, {
      fieldValue: action.payload,
      meta: action.meta
    });
  case reduxActionTypes.REDUX_FORM_BLUR:
    return Object.assign({}, state, {
      fieldValue: action.payload,
    });
  case ActionTypes.SHOW_TAG_SECTION:
    return Object.assign({}, state, {
      tagSectionVisible: action.payload,
    });
  default: return state;
  }
}

