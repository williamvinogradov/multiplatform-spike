import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';

function useViewModel<TViewModel, TViewModelResult extends TViewModel>(
  viewModel$: Observable<TViewModel>
): TViewModelResult | undefined {
  const [viewModel, setViewModel] = useState<TViewModel>();

  useEffect(() => {
    const subscription = viewModel$.subscribe(setViewModel);

    return () => subscription.unsubscribe();
  }, [viewModel$]);

  return viewModel as TViewModelResult;
}

export {
  useViewModel,
}
