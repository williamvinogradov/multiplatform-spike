import { ObjectType } from './types';

export const getKeys = <T>(object: ObjectType<T>) => Object.keys(object) as (keyof T)[];
