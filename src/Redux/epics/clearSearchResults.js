import { actionTypes as ActionTypes } from '../actions/Actions';
import { clearSearchResults } from '../actions/ActionCreator';

export default action$ =>
  action$.ofType(ActionTypes.SEARCH)
    .filter(action => !action.payload.query)
    .map(clearSearchResults);
