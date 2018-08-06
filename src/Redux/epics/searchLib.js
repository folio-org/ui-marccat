import { Observable } from 'rxjs/Observable';
import { replace } from 'react-router-redux';
import { ajax } from 'rxjs/observable/dom/ajax';
import { actionTypes as ActionTypes } from '../actions/Actions';
import { search } from '../actions/ActionCreator';

export default function searchUsers(action$) {
  return action$.ofType(ActionTypes.SEARCH)
    .map(action => action.payload.query)
    .filter(q => !!q)
    .switchMap(q =>
      Observable.timer(800) // debounce
        .takeUntil(action$.ofType(ActionTypes.CLEAR_SEARCH_RESULTS))
        .mergeMap(() => Observable.merge(
          Observable.of(replace(`?q=${q}`)),
          ajax.getJSON(`https://api.github.com/search/users?q=${q}`)
            .map(res => res.items)
            .map(search)
        )));
}
