/* eslint-disable no-use-before-define */
// @flow
type Action = { +type: string, paylod: Object }
type State = { };
type GetState = () => State;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
