import { ObjectType } from '../../utils';
import { StateModelConfigMap } from './types';
import { getChangedKeys } from './getChangedKeys';

export const changesMiddleware = <TModel>(
  prev: ObjectType<TModel>,
  next: ObjectType<TModel>,
  config: StateModelConfigMap<TModel> = {},
): [ObjectType<TModel>, boolean] => {
  const result = { ...next };
  const changedKeys = getChangedKeys(prev, next);
  let changesCount = changedKeys.length;

  changedKeys.forEach((key) => {
    const configItem = config[key];

    if (configItem && configItem.isControlled) {
      result[key] = prev[key];
      changesCount -= 1;
    }
  });

  return [result, changesCount > 0];
};
