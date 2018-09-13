import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducer as marccatReducer,
  epic as marccatEpic,
  search as marccatSearchEpic } from './reducers/Reducer';

export const reducer = combineReducers({
  data: marccatReducer
});

export const epics = combineEpics(
  marccatEpic,
  marccatSearchEpic
);
