import {map, Observable} from 'rxjs';
import {IState} from '../state';
import {refsComparer} from './refsComparer';

function watch<TState, TWatchResult>(selector: (state: TState) => TWatchResult)
  : (source$: Observable<IState<TState>>) => Observable<TWatchResult> {
  return (source$) => source$
    .pipe(
      map(({payload}) => payload),
      map(selector),
      refsComparer(),
    )
}

export {
  watch,
}
