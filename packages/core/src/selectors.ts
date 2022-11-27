import {
  Comparer, memoize, ObjectType, shadowComparer,
} from './utils';

export type Selector<TState extends ObjectType, TResult> = (state: TState) => TResult;

export function createCacheSelector<TState extends ObjectType, TParams, TResult>(
  getParams: (state: TState) => TParams,
  cachedSelector: (params: TParams) => TResult,
  paramsComparer: Comparer<[TParams]> = shadowComparer,
): Selector<TState, TResult> {
  const cached = memoize(cachedSelector, paramsComparer);

  return (state) => cached(getParams(state));
}
