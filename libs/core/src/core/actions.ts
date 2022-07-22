type TActionHandlerMap<TActionTypes extends string> = Record<TActionTypes, ActionHandler<TActionTypes>>;

interface IAction<TActionTypes extends string> {
  id: TActionTypes;
}

abstract class ActionHandler<TActionTypes extends string> {
  abstract handleAction(action: IAction<TActionTypes>): void;
}

class Reducer<TActionTypes extends string> {
  constructor(private handlersMap: TActionHandlerMap<TActionTypes>) {
  }

  handleAction(action: IAction<TActionTypes>): void {
    const handler = this.handlersMap[action.id];

    if (!handler) {
      throw Error(`Reducer: handler for action with id ${action.id.toString()} not found.`)
    }

    handler.handleAction(action);
  }
}

export {
  TActionHandlerMap,
  IAction,
  ActionHandler,
  Reducer
}