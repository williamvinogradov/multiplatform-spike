// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionHandlers = Record<PropertyKey, (value: any) => void>;

export function createReducer<TActions extends ActionHandlers>(actions: TActions) {
  const invalidActions = Reflect.ownKeys(actions).filter((k) => actions[k] === undefined);
  if (invalidActions.length > 0) {
    throw new Error(`Handlers for actions are not defined: ${invalidActions.join(', ')}`);
  }

  return ({ action, value }: {
    [Action in keyof TActions]: TActions[Action] extends (value: infer Value) => void ? {
      action: Action;
      value: Value;
    } : never
  }[keyof TActions]) => {
    if (!(action in actions)) {
      throw new Error(`Unknown action: '${String(action)}'`);
    }

    actions[action].call(undefined, value);
  };
}
