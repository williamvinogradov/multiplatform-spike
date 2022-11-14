import { ObjectType } from './types';

export const getKeys = <T extends ObjectType>(object: T) => Reflect.ownKeys(object) as (keyof T)[];
