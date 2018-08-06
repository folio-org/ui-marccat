import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

// Da rimuovere con una gestione dello stato migliore
export default class SearchProvider {
  constructor() {
    this.searchTerm = new BehaviorSubject();
  }

  search(term) {
    this.searchTerm.next(term.value);
  }

  performSearch(term) {
    const promise = fetch(`${window.ctx.searchUrl}/${term}`)
      .then(response => response.json());
    return Observable.fromPromise(promise);
  }

  showResults() {
    return this.searchTerm
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => (term
        ? this.performSearch(term) : Observable.of([])))
      .catch(() => {
        // console.error(error);
        return Observable.of([]);
      });
  }
}
