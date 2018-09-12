import { ajax } from 'rxjs/observable/dom/ajax';
import { actionTypes as ActionTypes } from '../actions/Actions';
import { receiveLogicalView } from '../actions/ActionCreator';
import * as C from '../../Utils/Constant';

export default function fetchLogicalView(action$) {
  return action$.ofType(ActionTypes.REQUEST_LOGICAL_VIEW)
    .map(action => action.payload.view) // aziona che passa i parametri al url
    .switchMap(view =>
      ajax.getJSON(C.ENDPOINT.BASE_URL.concat(C.ENDPOINT.LOGICAL_VIEW_URL))
        .map(receiveLogicalView.bind(null, view))); // dipatch action con il risultato, i prametri iniziali
}

