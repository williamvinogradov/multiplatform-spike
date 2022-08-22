import {map, Observable} from 'rxjs';
import {IState} from '../state';
import {watch} from './watch';

function getViewModel<TViewModel, TState, TStateSlice>(
  selector: (state: TState) => TStateSlice,
  getViewModelFunc: (slice: TStateSlice) => TViewModel,
): (source$: Observable<IState<TState>>) => Observable<TViewModel> {
  return (source$) => source$
    .pipe(
      watch(selector),
      map(getViewModelFunc)
    );
}

export {
  getViewModel,
}
