import { ObjectType } from './types';

// TODO: Will be changed in middlewares PR.
// https://github.com/williamvinogradov/multiplatform-spike/pull/11
export const getKeys = <T extends ObjectType>(object: T) => Object.keys(object) as (keyof T)[];
