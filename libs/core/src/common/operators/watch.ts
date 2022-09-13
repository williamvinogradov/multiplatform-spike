import {distinctUntilChanged, map, Observable} from 'rxjs';
import {IState} from '../state';
import {shadowComparer} from '../utils';


function watch<TState, TWatchResult>(
  selector: (state: TState) => TWatchResult,
  comparer: (prev: TWatchResult, next: TWatchResult) => boolean = shadowComparer,
): (source$: Observable<IState<TState>>) => Observable<TWatchResult> {
  return (source$) => source$
    .pipe(
      map(({payload}) => payload),
      map(selector),
      distinctUntilChanged(comparer),
    )
}

export {
  watch,
}
