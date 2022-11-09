import { getKeys, ObjectType } from '../../utils';

export const getChangedKeys = <TModel extends ObjectType>(
  prev: TModel,
  next: TModel,
): (keyof TModel)[] => getKeys(next).filter((key) => next[key] !== prev[key]);
