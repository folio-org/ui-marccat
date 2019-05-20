import * as React from 'react';
import {
  withState,
} from 'recompose';

const History = ({
  counter,
  pushHistory,
  undo,
  redo,
  index,
  thread
}) => (
  <div>
    <h1>HistoryDemo</h1>
    <p>
      <span>Count:</span>
      <num>{counter}</num>
    </p>
    <button type="button" onClick={() => pushHistory({ counter: counter + 1 })}>increment</button>
    <button type="button" onClick={() => pushHistory({ counter: counter - 1 })}>decrement</button>
    <hr />
    <button type="button" disabled={index <= 0} onClick={undo}>Undo</button>
    <button type="button" disabled={index >= thread.length - 1} onClick={redo}>Redo</button>
  </div>
);

const initialState = {
  counter: 1
};

export default withState(initialState)(History);
