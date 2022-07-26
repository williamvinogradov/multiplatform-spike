import {State} from "./state";

type TActionHandlerMap<TActionType extends string, TState> = Record<TActionType, ActionHandler<TActionType, TState>>;

abstract class Action<TActionType extends string> {
  protected constructor(public id: TActionType) {
  }
}

abstract class ActionHandler<TActionType extends string, TState> {
  constructor(protected state: State<TState>) {}

  abstract handleAction(action: Action<TActionType>): void;
}

class Reducer<TActionType extends string, TState> {
  constructor(private handlersMap: TActionHandlerMap<TActionType, TState>) {
  }

  handleAction(action: Action<TActionType>): void {
    const handler = this.handlersMap[action.id];

    if (!handler) {
      throw Error(`Reducer: handler for action with id ${action.id.toString()} not found.`)
    }

    handler.handleAction(action);
  }
}

export {
  TActionHandlerMap,
  Action,
  ActionHandler,
  Reducer
}