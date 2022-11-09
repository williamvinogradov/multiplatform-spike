// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionHandlers = Record<PropertyKey, (value: any) => void>;

export function createReducer<THandlers extends ActionHandlers>(handlers: THandlers) {
  const invalidActions = Reflect.ownKeys(handlers).filter((k) => handlers[k] === undefined);
  if (invalidActions.length > 0) {
    throw new Error(`Handlers for actions are not defined: ${invalidActions.join(', ')}`);
  }

  return ({ action, value }: {
    [Action in keyof THandlers]: THandlers[Action] extends (value: infer Value) => void ? {
      action: Action;
      value: Value;
    } : never
  }[keyof THandlers]) => {
    if (!(action in handlers)) {
      throw new Error(`Unknown action: '${String(action)}'`);
    }

    return handlers[action].call(undefined, value);
  };
}
