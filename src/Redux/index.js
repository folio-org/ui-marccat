import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  reducer as marccatReducer,
  formReducer as marccatFormReducer,
  epic as marccatEpic,
} from './Reducer';

export const reducer = combineReducers({
  data: marccatReducer,
  form: marccatFormReducer
});

export const epics = combineEpics(
  marccatEpic
);
