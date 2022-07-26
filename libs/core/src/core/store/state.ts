import {BehaviorSubject, Observable, take, distinctUntilChanged, Subject} from 'rxjs';

type TSelectStateFunc<TState, TResult> = (state: TState) => TResult;
type TUpdateStateFunc<TState> = (state: TState) => Partial<TState>;

class State<TState> {
  private state: BehaviorSubject<TState>;
  private outputState: Subject<TState>;

  state$: Observable<TState>;
  outputState$: Observable<TState>;

  constructor(private defaultStateValue: TState) {
    this.state = new BehaviorSubject<TState>(defaultStateValue);
    this.outputState = new Subject<TState>();

    this.state$ = this.state.asObservable().pipe(
      // TODO: Implement deep object comparison here?
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next))
    );
    this.outputState$ = this.outputState.asObservable().pipe(distinctUntilChanged());
  }

  updateState(updateFunc: TUpdateStateFunc<TState>, emitToOutputs = true): void {
    this.state.pipe(take(1)).subscribe((oldState) => {
      const newState = {
        ...oldState,
        ...updateFunc(oldState),
      };
      this.state.next(newState);

      if (emitToOutputs) {
        this.outputState.next(newState);
      }
    })
  }

  resetToDefault(): void {
    this.state.next(this.defaultStateValue);
  }
}

export type { TSelectStateFunc, TUpdateStateFunc };
export { State };