import {StateValue} from './state';


abstract class Action<TAction extends string> {
  abstract type: TAction
}

type ActionHandler<TAction extends string, TModel extends {}, TDictionary extends {}> = (
  state: StateValue<TModel, TDictionary>,
  action: Action<TAction>
) => Partial<TModel>;
type ActionMap<TAction extends string, TModel extends {}, TDictionary extends {}> =
  Record<TAction, ActionHandler<TAction, TModel, TDictionary>>;

function createReducer<TAction extends string, TModel extends {}, TDictionary extends {}>(
  actions: ActionMap<TAction, TModel, TDictionary>
): (
  state: StateValue<TModel, TDictionary>,
  action: Action<TAction>
) => Partial<TModel> {
  const actionMap = actions;

  return (
    state: StateValue<TModel, TDictionary>,
    action: Action<TAction>) => {
    const handler = actionMap[action.type];

    if (!handler) {
      throw Error(`Handler for action ${action.type} not specified.`);
    }

    return handler(state, action);
  }
}

export type {
  ActionHandler,
  ActionMap,
}

export {
  Action,
  createReducer
};
