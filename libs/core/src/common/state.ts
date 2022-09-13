import {BehaviorSubject, take} from 'rxjs';

interface IStateUpdateMeta {
  emitOutputs: boolean;
}

interface IState<TState> {
  payload: TState;
  meta: IStateUpdateMeta;
}

type TUpdateStateActionResult<TState> = [newStatePart: Partial<TState>, meta?: IStateUpdateMeta];
type TUpdateStateActionFunc<TState> = (state: TState) => TUpdateStateActionResult<TState>;

const STATE_UPDATE_DEFAULT_META: IStateUpdateMeta = {
  emitOutputs: true,
}

class State<TState> {
  private stateSubject = new BehaviorSubject<IState<TState>>({
    payload: this.defaultPayload,
    meta: {
      emitOutputs: false,
    }
  });

  state$ = this.stateSubject.asObservable();

  constructor(protected defaultPayload: TState) {
  }

  updateState(updateFunc: TUpdateStateActionFunc<TState>): void {
    this.stateSubject.pipe(take(1)).subscribe(({payload}) => {
      const [newStatePart, meta] = updateFunc(payload);

      this.stateSubject.next({
        payload: {
          ...payload,
          ...newStatePart
        },
        meta: {
          ...meta,
          ...STATE_UPDATE_DEFAULT_META,
        },
      });
    });
  }
}

export type {
  IState,
  TUpdateStateActionResult,
  TUpdateStateActionFunc,
  IStateUpdateMeta,
}

export {
  State,
}
