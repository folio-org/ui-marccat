import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducer as marccatReducer } from './reducers/Reducer';
import { epic } from './epic/epic'; //eslint-disable-line

export const reducer = combineReducers({
  data: marccatReducer,
});

export const epics = combineEpics({
  epic
});
