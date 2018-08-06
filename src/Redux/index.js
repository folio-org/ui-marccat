import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducer as marccatReducer, epic as marccatEpic, search as marccatSearchEpic } from './reducers/Reducer';
import marccatFormReducer from './reducers/FormReducer';


export const reducer = combineReducers({
  data: marccatReducer,
  form: marccatFormReducer
});

export const epics = combineEpics(
  marccatEpic,
  marccatSearchEpic
);
