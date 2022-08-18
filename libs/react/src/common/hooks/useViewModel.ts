import {useEffect, useState} from 'react';
import {Observable} from 'rxjs';

function useViewModel<TViewModel>(viewModel$: Observable<TViewModel>): TViewModel | undefined {
  const [viewModel, setViewModel] = useState<TViewModel>();

  useEffect(() => {
    const subscription = viewModel$.subscribe(setViewModel);

    return () => subscription.unsubscribe();
  }, [viewModel$]);

  return viewModel;
}

export {
  useViewModel,
}
