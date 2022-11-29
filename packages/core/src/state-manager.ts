import { ObjectType } from './utils';

export type StateUpdateFunc<TState> = (state: TState) => Partial<TState>;

export interface StateManager<TState extends ObjectType> {
  getCurrent(): TState;
  getNext(): TState,
  scheduleUpdate(updateFunc: StateUpdateFunc<TState>): void;
  commitUpdates(): void;
  rollbackUpdates(): void;
}

export function createStateManager<TState extends ObjectType>(
  state: TState,
): StateManager<TState> {
  let currentState = state;
  let nextState = state;

  const getCurrent = () => currentState;

  const getNext = () => nextState;

  const scheduleUpdate = (
    updateFunc: (state: TState) => Partial<TState>,
  ): void => {
    nextState = {
      ...nextState,
      ...updateFunc(nextState),
    };
  };

  const commitUpdates = () => {
    currentState = nextState;
  };

  const rollbackUpdates = () => {
    nextState = currentState;
  };

  return {
    getCurrent,
    getNext,
    scheduleUpdate,
    commitUpdates,
    rollbackUpdates,
  };
}
