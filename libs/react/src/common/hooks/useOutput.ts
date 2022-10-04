import {useEffect, useMemo, useRef, useState} from 'react';
import {asyncScheduler, Observable, scheduled, skip, Subscription} from 'rxjs';

type TCallback<T> = ((value: T) => void) | undefined;
type TClosure<T> = [Subscription, (newValue: TCallback<T>) => void];

// closure to subscribe on component mount & unsubscribe on unmount.
function subscriptionClosure<T>(
  output$: Observable<T>
): TClosure<T> {
  let callback: TCallback<T> = undefined;

  return [
    //subscription.
    scheduled(output$, asyncScheduler)
      .subscribe((value) => {
        callback && callback(value)
      }),
    // update closure value func.
    (newValue: TCallback<T>) => callback = newValue,
  ]
}

function useOutput<TOutputValue>(
  output$: Observable<TOutputValue>,
  callback: TCallback<TOutputValue>,
): void {
  // memoize closure, because useMemo not fired on second component mount :(
  const memoClosure = useMemo<{ closure: TClosure<TOutputValue> | [] }>(() => ({closure: []}), []);

  // subscribe on mount & unsubscribe on unmount.
  useEffect(() => {
    memoClosure.closure = subscriptionClosure(output$);

    return () => {
      const [subscription] = memoClosure.closure;
      subscription?.unsubscribe();
    }
  }, []);

  // update callback when it changes.
  useEffect(() => {
    const [_, updateCallback] = memoClosure.closure;
    updateCallback && updateCallback(callback);
  }, [callback]);
}

export {
  useOutput
}
