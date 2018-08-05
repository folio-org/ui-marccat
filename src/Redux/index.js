import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import {
  reducer as marccatReducer,
  epic as marccatEpic
} from './Reducer';

export const reducer = combineReducers({
  data: marccatReducer
});

export const epics = combineEpics(
  marccatEpic
);
