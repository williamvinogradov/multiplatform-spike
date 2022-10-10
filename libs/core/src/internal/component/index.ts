import {Action} from '../store';

interface ComponentCore<TActions extends string, TViewModels> {
  destroy: () => void;
  dispatch: (action: Action<TActions>) => void;
  viewModels: TViewModels;
}

export {ComponentCore};
