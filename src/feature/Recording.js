import * as React from 'react';
import {
  withStateHandlers,
} from 'recompose';
import withHistory from './withHistory';


function _updateThread(state, newState) {
  const updateThread = [
    ...state.thread.slice(0, state.index + 1),
    newState
  ];
  const updateIndex = updateThread.length - 1;
  return {
    index: updateIndex,
    thread: updateThread,
    ...updateThread[updateIndex]
  };
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function _moveIndex(state, moveBy) {
  const targetIndex = clamp(state.index + moveBy, 0, state.thread.length - 1);
  return {
    index: targetIndex,
    thread: state.thread,
    ...state.thread[targetIndex]
  };
}

export default (initialState) => withStateHandlers({ thread: [initialState], index: 0, ...initialState }, {
  pushHistory: (state, _props) => newState => _updateThread(state, newState),
  go: (state, _props) => i => _moveIndex(state, i),
  forward: (state, _props) => () => _moveIndex(state, 1),
  backward: (state, _props) => () => _moveIndex(state, -1),
  undo: (state, _props) => () => _moveIndex(state, -1),
  redo: (state, _props) => () => _moveIndex(state, 1)
});
