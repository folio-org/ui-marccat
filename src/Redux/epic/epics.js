import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypes } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT } from '../../Utils/Constant';
import LogicalViews from '../models/LogicalViews';

// TODO FIXME
const URL = ENDPOINT.BASE_URL.concat('/').concat(ENDPOINT.LOGICAL_VIEW_URL).concat('?lang=ita');

export default function fetchLogicalViewsEpic(action$) {
  return action$
    .ofType(ActionTypes.FETCH_LOGICAL_VIEWS)
    .switchMap(() => {
      return ajax
        .getJSON(URL, ENDPOINT.HEADERS)
        .map((data:LogicalViews) => data.views);
    })
    .map(views => marccatActions.fetchLogicalViewsSuccess(views))
    .catch(error => Observable.of(marccatActions.fetchLogicalViewsFailure(error.message)));
}
