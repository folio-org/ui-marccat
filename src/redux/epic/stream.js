import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

/**
 * esempio utilizzo: (l ordine è mantenuto!)
 * const selcetOneSelectTwoEpic = action$ =>
 * action$.ofType(CREATE_SELECT_ONE_AND_TWO)
 *   .mergeMap(action =>
 *     forkEpic(createSelectOneEpic, createSelectOne(action.payload.item))
 *       .concat(
 *         forkEpic(createSelectTwoEpic, createSelectTwo(action.payload.selectItem))
 *       ),
 *   );
 * @param {*} epicFactory
 * @param  {...any} actions
 */
export const forkEpic = (epicFactory, ...actions) => {
  const actions$ = ActionsObservable.of(...actions);
  return epicFactory(actions$);
};

export const forkEpicBind = (epicFactory, props, ...actions) => {
  const input$ = Observable.of(...actions);
  const actions$ = new ActionsObservable(input$);
  return epicFactory(actions$);
};

