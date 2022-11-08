import { ActionFunc, ObjectType } from '../../utils';
import { StateModelConfigMap } from './types';
import { getChangedKeys } from './getChangedKeys';

export const callbacksMiddleware = <TModel>(
  prev: ObjectType<TModel>,
  next: ObjectType<TModel>,
  config: StateModelConfigMap<TModel> = {},
): ActionFunc[] => getChangedKeys(prev, next).reduce((result, key) => {
    const configItem = config[key];

    if (configItem) {
      result.push(() => { configItem.publicCallback(next[key]); });
    }

    return result;
  }, [] as ActionFunc[]);
