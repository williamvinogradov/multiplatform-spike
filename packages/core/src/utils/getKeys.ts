import { ObjectType } from './types';

export const getKeys = <T extends ObjectType>(object: T) => {
  const keys = Object.keys(object);
  const symbols = Object.getOwnPropertySymbols(object);
  return [...keys, ...symbols] as (keyof T)[];
};
