import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  reducer as marccatReducer,
  formReducer as marccatFormReducer,
  epic as marccatEpic,
} from './reducers/Reducer';

import {
  searchInPreFlight as marccatSearchPreflightReducer,
  userResults
} from './reducers/SearchPreflight';

export const reducer = combineReducers({
  data: marccatReducer,
  form: marccatFormReducer,
  searchInPreFlight: marccatSearchPreflightReducer,
  userResults
});

export const epics = combineEpics(
  marccatEpic
);
