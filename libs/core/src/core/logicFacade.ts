import {Store} from "./store";
import {ViewModelGenerator} from "./viewModel";
import {distinctUntilChanged, map, Observable, Subscription} from "rxjs";
import {Action, TActionHandlerMap} from "./actions";
import {State, TSelectStateFunc} from "./state";

type TOutputCallback<TOutputs> = (result: TOutputs[keyof TOutputs]) => void;
type TOutputSelector<TState, TOutputs> = TSelectStateFunc<TState, TOutputs[keyof TOutputs]>;
type TOutputMapping<TOutputs, TState> = Record<keyof TOutputs, {
  selector: TOutputSelector<TState, TOutputs>,
  callback: TOutputCallback<TOutputs>
}>;

abstract class LogicFacade<TOutputs, TActionTypes extends string, TState, TViewModel> {
  private store: Store<TActionTypes, TState>;
  private outputSubscriptions: Subscription[] = [];

  viewModel$: Observable<TViewModel>;

  protected constructor(
    state: State<TState>,
    handlersMap: TActionHandlerMap<TActionTypes, TState>,
    protected viewModelGenerator: ViewModelGenerator<TState, TViewModel>,
  ) {
    this.store = new Store<TActionTypes, TState>(state, handlersMap);
    this.viewModel$ = this.store.state$.pipe(
      map((state) => this.viewModelGenerator.generate(state)),
      distinctUntilChanged(),
    );
  }

  doAction(action: Action<TActionTypes>): void {
    console.log('do action: ', action.id);
    this.store.doAction(action);
  }

  mapStateChangeToOutputs(outputMapping: TOutputMapping<TOutputs, TState>): void {
    (Object.keys(outputMapping) as Array<keyof TOutputs>).forEach((key) => {
      const { selector, callback } = outputMapping[key];
      const subscription = this.store.outputState$
        .pipe(
          map((state) => selector(state)),
          distinctUntilChanged(),
        ).subscribe((result) => callback(result));
      this.outputSubscriptions.push(subscription);
    });
  }

  destroy(): void {
    this.outputSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

export { LogicFacade, TOutputMapping }