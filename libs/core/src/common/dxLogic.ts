import {State} from './state';

abstract class DxLogic<TState> {
  protected state$ = this.state.state$;

  constructor(protected state: State<TState>) {}
}

export {
  DxLogic
}
