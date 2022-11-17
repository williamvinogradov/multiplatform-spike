import { StateValue } from './state';
import { ObjectType } from './utils';

export type Handlers<TState extends StateValue<ObjectType, ObjectType>> =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<PropertyKey, (state: TState, value: any) => Partial<TState['model']>>;

export type Reducer<
  TState extends StateValue<ObjectType, ObjectType>,
  THandlers extends Handlers<TState>,
> = <TAction extends keyof THandlers>(
  state: TState,
  action: TAction,
  value: Parameters<THandlers[TAction]>[1]
) => Partial<TState['model']>;

export function createReducer<TState extends StateValue<ObjectType, ObjectType>>() {
  return <THandlers extends Handlers<TState>>(
    handlers: THandlers,
  ): Reducer<TState, THandlers> => {
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
