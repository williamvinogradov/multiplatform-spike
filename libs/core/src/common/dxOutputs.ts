import {filter, Observable} from 'rxjs';
import {watch} from './operators';
import {IState, State} from './state';

/** @obsolete **/
abstract class DxOutputs<TState, TOutputs> {
  protected state$ = this.state.state$;

  abstract outputs$: {
    [K in keyof TOutputs]: Observable<TOutputs[K]>
  }

  constructor(protected state: State<TState>) {}

  protected getOutput$<TProp extends keyof TOutputs>(
    selector: (state: TState) => TOutputs[TProp]
  ): Observable<TOutputs[TProp]> {
    return this.state$.pipe(
      filter(({meta}: IState<TState>) => meta.emitOutputs),
      watch(selector),
    )
  }
}

export {
  DxOutputs,
}
