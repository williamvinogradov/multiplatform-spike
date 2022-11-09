type Handler<TState, TValue> = (state: TState, value: TValue) => Partial<TState>;

export function createReducer<TState>() {
  return <THandlers extends Record<PropertyKey, Handler<TState, any>>>(handlers: THandlers): <TAction extends keyof THandlers>( // eslint-disable-line max-len, @typescript-eslint/no-explicit-any
    state: TState,
    action: TAction,
    value: Parameters<THandlers[TAction]>[1]
  ) => Partial<TState> => {
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
