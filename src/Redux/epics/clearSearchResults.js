import * as ActionTypes from '../actions/Actions';
import { clearSearchResults } from '../actions/ActionCreator';

export default action$ =>
  action$.ofType(ActionTypes.SEARCHED_USERS)
    .filter(action => !action.payload.query)
    .map(clearSearchResults);
