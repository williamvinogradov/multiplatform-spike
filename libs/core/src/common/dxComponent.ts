import {Observable} from 'rxjs';
import {IState, State} from './state';

abstract class DxComponent<TState> {
  protected state: State<TState>;
  protected state$: Observable<IState<TState>>;

  protected constructor(defaultState: TState) {
    this.state = new State(defaultState);
    this.state$ = this.state.state$;
  }
}

export {DxComponent};
