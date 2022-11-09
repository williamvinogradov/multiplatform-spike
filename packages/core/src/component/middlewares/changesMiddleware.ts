import { ObjectType } from '../../utils';
import { ModelConfigMap } from './types';
import { getChangedKeys } from './getChangedKeys';

type ModelChangesTuple<TModel extends ObjectType> = [newModel: TModel, hasChanges: boolean];

export const changesMiddleware = <TModel extends ObjectType>(
  prev: TModel,
  next: TModel,
  config: ModelConfigMap<TModel> = {},
): ModelChangesTuple<TModel> => {
  const result = { ...next };
  const changedKeys = getChangedKeys(prev, next);
  let changesCount = changedKeys.length;

  changedKeys.forEach((key) => {
    const configItem = config[key];

    if (configItem && configItem.controlledMode) {
      result[key] = prev[key];
      changesCount -= 1;
    }
  });

  return [result, changesCount > 0];
};
