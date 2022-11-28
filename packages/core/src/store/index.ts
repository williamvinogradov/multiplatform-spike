import { StateConfigMap } from '../middlewares';
import { createStateManager, StateUpdateFunc } from '../state-manager';
import {
  createObservableEmitter,
  ObjectType,
  pipe,
  PipeFunc,
  SubscribeFunc,
} from '../utils';
import { executeCallbacks } from './execute-callbacks';
import { updateState } from './update-state';

export enum UpdateSource {
  props = 'props',
  action = 'action',
}

export interface Store<TState extends ObjectType> {
  getState(): Readonly<TState>;
  subscribe: SubscribeFunc<TState>;
  addUpdate(updateFunc: StateUpdateFunc<TState>): void;
  commitUpdates(source?: UpdateSource): void;
  rollbackUpdates(): void;
}

export function createStore<TState extends ObjectType>(
  state: TState,
  stateConfig: StateConfigMap<TState>,
  validation: PipeFunc<TState>[] = [],
): Store<TState> {
  const stateManager = createStateManager(state);
  const { emit, subscribe } = createObservableEmitter<TState>(state);
  const validator = pipe(...validation);

  const commitUpdatesFromProps = (): void => {
    stateManager.commitUpdates();

    const currentState = stateManager.getCurrent();

    const validatedState = validator(currentState);
    updateState(currentState, validatedState, { stateConfig, stateManager });

    emit(stateManager.getCurrent());

    executeCallbacks(currentState, validatedState, { stateConfig });
  };

  const commitUpdatesFromAction = (): void => {
    const currentState = stateManager.getCurrent();
    const nextState = stateManager.getNext();

    const validatedState = validator(nextState);
    const hasChanges = updateState(currentState, validatedState, { stateConfig, stateManager });

    if (hasChanges) {
      emit(stateManager.getCurrent());
    }

    executeCallbacks(currentState, validatedState, { stateConfig });
  };

  const commitUpdates = (source = UpdateSource.action):void => {
    switch (source) {
      case UpdateSource.props:
        commitUpdatesFromProps();
        break;
      case UpdateSource.action:
        commitUpdatesFromAction();
        break;
      default:
        throw Error(`Unknown update source: ${source}`);
    }
  };

  return {
    getState: stateManager.getCurrent,
    subscribe,
    addUpdate: stateManager.addUpdate,
    commitUpdates,
    rollbackUpdates: stateManager.rollbackUpdates,
  };
}
