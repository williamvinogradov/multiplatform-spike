type Handler<TState, TValue> = (state: TState, value: TValue) => Partial<TState>;

export function createReducer<TState>() {
  return <THandlers extends Record<PropertyKey, Handler<TState, any>>>(handlers: THandlers): ( // eslint-disable-line max-len, @typescript-eslint/no-explicit-any
    state: TState,
    actionObj: {
      [Action in keyof THandlers]: (typeof handlers)[Action] extends Handler<any, infer Value> ? { // eslint-disable-line max-len, @typescript-eslint/no-explicit-any
        action: Action;
        value: Value;
      } : never
    }[keyof THandlers]
  ) => Partial<TState> => {
    const invalidActions = Reflect.ownKeys(handlers).filter((k) => handlers[k] === undefined);
    if (invalidActions.length > 0) {
      throw new Error(`Handlers for actions are not defined: ${invalidActions.join(', ')}`);
    }

    return (state, { action, value }) => {
      if (!handlers[action]) {
        throw new Error(`Unknown action: '${String(action)}'`);
      }

      return handlers[action](state, value);
    };
  };
}
