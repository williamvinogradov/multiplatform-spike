import { useEffect, useRef, useState } from 'react';
import {
  ObjectType,
  Selector,
  shadowComparer,
  Store,
} from '@devexpress/core';

export function useSelector<TState extends ObjectType, TResult>(
  store: Store<TState>,
  selector: Selector<TState, TResult>,
  deps: unknown[] = [],
) {
  const depsRef = useRef(deps);
  const [result, setResult] = useState(selector(store.getState()));

  if (!shadowComparer(depsRef.current, deps)) {
    depsRef.current = deps;
    setResult(selector(store.getState()));
  }

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      setResult(selector(state));
    });

    return () => { unsubscribe(); };
  }, deps);

  return result;
}
