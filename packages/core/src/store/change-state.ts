import { controlledModeMiddleware, StateConfigMap } from '../middlewares';
import { StateManager } from '../state-manager';
import { ObjectType } from '../utils';

type MethodDeps<TState extends ObjectType> = {
  stateConfig: StateConfigMap<TState>,
  stateManager: StateManager<TState>,
};

export function changeState<TState extends ObjectType>(
  currentState: TState,
  validatedState: TState,
  { stateConfig, stateManager } : MethodDeps<TState>,
): boolean {
  const [newState, hasChanges] = controlledModeMiddleware(
    currentState,
    validatedState,
    stateConfig,
  );

  if (hasChanges) {
    stateManager.addUpdate(() => newState);
    stateManager.commitUpdates();
  }

  return hasChanges;
}
