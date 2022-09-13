import {filter, map, Observable, pairwise} from 'rxjs';
import {IState} from '../state';
import {shadowComparer} from '../utils';

function watchOutput<TState, TOutput>(
  selector: (state: TState) => TOutput,
  comparer: (prev: TOutput, next: TOutput) => boolean = shadowComparer,
): (source$: Observable<IState<TState>>) => Observable<TOutput> {
  return source$ =>
    source$.pipe(
      filter(({meta}) => !!meta.emitOutputs),
      map(({payload}) => payload),
      map(selector),
      pairwise(),
      filter(([prev, next]) => !comparer(prev, next)),
      map(([, next]) => next)
    );
}

export {watchOutput};
