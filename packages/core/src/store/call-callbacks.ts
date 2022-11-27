import { callbacksMiddleware, StateConfigMap } from '../middlewares';
import { ObjectType } from '../utils';

type MethodDeps<TState extends ObjectType> = {
  stateConfig: StateConfigMap<TState>,
};

export function callCallbacks<TState extends ObjectType>(
  currentState: TState,
  validatedState: TState,
  { stateConfig } : MethodDeps<TState>,
): void {
  const pendingCallbacks = callbacksMiddleware(
    currentState,
    validatedState,
    stateConfig,
  );

  pendingCallbacks.forEach((callback) => callback());
}
