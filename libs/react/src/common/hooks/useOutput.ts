import {useEffect} from 'react';
import {Observable} from 'rxjs';

function useOutput<TOutputValue>(
  output$: Observable<TOutputValue>,
  callback?: (value: TOutputValue) => void,
): void {
  useEffect(() => {
    const subscription = output$
      .subscribe((value) => {
        callback ? callback(value): undefined
      });

    return () => subscription.unsubscribe();
  }, [output$, callback]);
}

export {
  useOutput
}
