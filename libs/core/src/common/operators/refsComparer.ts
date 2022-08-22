import {distinctUntilChanged, Observable} from 'rxjs';

function refsComparer<T>(): (source$: Observable<T>) => Observable<T> {
  return (source$) => source$.pipe(
    distinctUntilChanged((prev, next) => !prev || prev === next)
  );
}

export {refsComparer}
