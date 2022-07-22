import {IAction, Reducer, TActionHandlerMap} from "./actions";
import {State} from "./state";
import {ViewModelGenerator} from "./viewModel";
import {map, Observable} from "rxjs";
import {OutputManager, TOutputCallback, TOutputSelector} from "./outputManager";

class Store<TActionTypes extends string, TState, TViewModel, TComponentOutputs> {
  private viewModelGenerator: ViewModelGenerator<TState, TViewModel>;
  private reducer: Reducer<TActionTypes>;
  private outputManager: OutputManager<TState, TComponentOutputs>;

  protected state: State<TState>;

  viewModel$: Observable<TViewModel>;

  constructor(
    state: State<TState>,
    viewModelGenerator: ViewModelGenerator<TState, TViewModel>,
    handlersMap: TActionHandlerMap<TActionTypes>,
    selectorsMap: Record<keyof TComponentOutputs, TOutputSelector<TState, TComponentOutputs>>
  ) {
    this.state = state;
    this.viewModelGenerator = viewModelGenerator;
    this.reducer = new Reducer(handlersMap);
    this.outputManager = new OutputManager(state, selectorsMap)

    this.viewModel$ = this.state.payload$
      .pipe(map((state) => this.viewModelGenerator.generate(state)));
  }

  initOutputs(callbackMap: Record<keyof TComponentOutputs, TOutputCallback<TComponentOutputs>>): void {
    this.outputManager.startListenState(callbackMap);
  }

  doAction(action: IAction<TActionTypes>): void {
    this.reducer.handleAction(action);
  }

  destroy(): void {
    this.outputManager.destroy();
  }
}

export { Store };