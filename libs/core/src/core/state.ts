import {BehaviorSubject, map, Observable, take, distinctUntilChanged, filter} from 'rxjs';

type TSelectStateFunc<TState, TResult> = (state: TState) => TResult;
type TUpdateStateFunc<TState> = (state: TState) => TState;

interface IStateMetadata {
  triggerOutputs: boolean;
}

interface IState<TState> {
  payload: TState,
  metadata: IStateMetadata;
}

class State<TState> {
  private state: BehaviorSubject<IState<TState>>;

  payload$: Observable<TState>;

  constructor(private defaultStateValue: TState) {
    this.state = new BehaviorSubject<IState<TState>>({
      payload: defaultStateValue,
      metadata: {
        triggerOutputs: false,
      }
    });
    this.payload$ = this.state.asObservable()
      .pipe(map(({payload}: IState<TState>) => payload))
      distinctUntilChanged()
  }

  select<TSelectResult>(selectFunc: TSelectStateFunc<TState, TSelectResult>, isOutputListening = false): Observable<TSelectResult> {
    return this.state.asObservable().pipe(
      filter(({ metadata }: IState<TState>) => metadata.triggerOutputs === isOutputListening),
      map(({payload}: IState<TState>) => selectFunc(payload)),
      distinctUntilChanged(),
    );
  }

  updateState(updateFunc: TUpdateStateFunc<TState>, metadata: IStateMetadata = { triggerOutputs: true }): void {
    this.state.pipe(take(1)).subscribe(({payload}) => {
      const newPayload = updateFunc(payload);
      this.state.next({
        payload: newPayload,
        metadata,
      });
    });
  }

  resetToDefault(metadata: IStateMetadata = { triggerOutputs: true }): void {
    this.state.next({
      payload: this.defaultStateValue,
      metadata,
    });
  }
}

export type { TSelectStateFunc, TUpdateStateFunc, IState, IStateMetadata };
export { State };