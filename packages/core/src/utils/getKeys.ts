import { ObjectType } from './types';

const getKeys = <T>(object: ObjectType<T>) => Object.keys(object) as (keyof T)[];

export { getKeys };
