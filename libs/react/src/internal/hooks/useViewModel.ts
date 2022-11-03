import {ViewModel} from '@dx/core/internal/component/viewModel';
import {useEffect, useState} from 'react';


// TODO: Think about how to rid off from this cast and redundant second generic parameter.
const useViewModel = <TViewModel, TReactViewModel extends TViewModel>(
  viewModel: ViewModel<TViewModel>
): TReactViewModel => {
  const [state, setState] = useState({value: viewModel.getValue()});
  useEffect(() => {
    const unsubscribe = viewModel.subscribe((viewModel) => {
      setState({value: viewModel});
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state.value as TReactViewModel;
}

export {useViewModel};
