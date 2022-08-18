import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';

function useAdapterViewModel<TViewModel extends TProps, TProps>(
  viewModel$: Observable<TViewModel>,
  additionalProps: Partial<TProps>,
): TProps | undefined {
  const [adapterViewModel, setAdapterViewModel] = useState<TProps>();

  useEffect(() => {
    const subscription = viewModel$.subscribe((viewModel) => {
      setAdapterViewModel({
        ...viewModel,
        ...additionalProps,
      });

      return () => subscription.unsubscribe();
    })
  }, [viewModel$, additionalProps]);

  return adapterViewModel;
}

export {
  useAdapterViewModel,
}
