import {Action, Reducer, TActionHandlerMap} from "./actions";
import {State, TSelectStateFunc} from "./state";
import {distinctUntilChanged, map, Observable} from "rxjs";

class Store<TActionTypes extends string, TState> {
  private reducer: Reducer<TActionTypes, TState>;

  protected state: State<TState>;

  state$: Observable<TState>;
  outputState$: Observable<TState>;

  constructor(
    state: State<TState>,
    handlersMap: TActionHandlerMap<TActionTypes, TState>,
  ) {
    this.state = state;
    this.reducer = new Reducer(handlersMap);

    this.state$ = this.state.state$;
    this.outputState$ = this.state.outputState$;
  }

  select<TSelectResult>(selectFunc: TSelectStateFunc<TState, TSelectResult>) {
    return this.state$.pipe(
      map((state) => selectFunc(state)),
      distinctUntilChanged(),
    );
  }

  doAction(action: Action<TActionTypes>): void {
    this.reducer.handleAction(action);
  }
}

export { Store };