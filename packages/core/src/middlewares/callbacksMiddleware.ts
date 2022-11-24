import { ActionFunc, ObjectType } from '../utils';
import { StateConfigMap } from './types';
import { getChangedKeys } from './getChangedKeys';

export function callbacksMiddleware<TState extends ObjectType>(
  prev: TState,
  next: TState,
  config: StateConfigMap<TState> = {},
): ActionFunc[] {
  return getChangedKeys(prev, next).reduce((result, key) => {
    const configItem = config[key];

    if (configItem) {
      result.push(() => { configItem.changeCallback(next[key]); });
    }

    return result;
  }, [] as ActionFunc[]);
}
