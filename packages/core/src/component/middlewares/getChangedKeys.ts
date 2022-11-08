import { getKeys, ObjectType } from '../../utils';

export const getChangedKeys = <TModel>(
  prev: ObjectType<TModel>,
  next: ObjectType<TModel>,
): (keyof TModel)[] => getKeys(next).filter((key) => next[key] !== prev[key]);
