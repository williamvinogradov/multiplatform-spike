import { ObjectType } from './utils';

export type Handlers<TState extends ObjectType, TReducerResult = TState> =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<PropertyKey, (state: TState, value: any) => Partial<TReducerResult>>;

export type Reducer<
  TState extends ObjectType,
  THandlers extends Handlers<TState>,
  TReducerResult = TState,
> = <TAction extends keyof THandlers>(
  state: TState,
  action: TAction,
  value: Parameters<THandlers[TAction]>[1]
) => Partial<TReducerResult>;

export function createReducer<TState extends ObjectType, TReducerResult = TState>() {
  return <THandlers extends Handlers<TState>>(
    handlers: THandlers,
  ): Reducer<TState, THandlers, TReducerResult> => {
    const invalidActions = Reflect.ownKeys(handlers).filter((k) => handlers[k] === undefined);
    if (invalidActions.length > 0) {
      throw new Error(`Handlers for actions are not defined: ${invalidActions.join(', ')}`);
    }

    return (state, action, value) => {
      if (!handlers[action]) {
        throw new Error(`Unknown action: '${String(action)}'`);
      }

      return handlers[action](state, value);
    };
  };
}
