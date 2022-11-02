import {ContainerCore, createCore, ModelPropertyConfigMap, RootCore, StateValue} from '../../../internal';
import {PAGER_ACTIONS, PagerActions} from './actions';
import {PAGER_DEFAULT_STATE, PagerDictionary, PagerModel} from './state';
import {pageNumberValidator, pageSizeValidator} from './validation';
import {PAGER_VIEW_MODELS, PagerViewModels} from './viewModels';


interface RootPagerCore extends RootCore<PagerModel, PagerDictionary> {
}

interface ContainerPagerCore extends ContainerCore<PagerActions, PagerViewModels> {
}

const createPagerCore = (
  state: StateValue<Partial<PagerModel>, Partial<PagerDictionary>>,
  stateConfig: ModelPropertyConfigMap<PagerModel>,
): [RootPagerCore, ContainerPagerCore] => createCore(
  {
    model: {
      ...PAGER_DEFAULT_STATE.model,
      ...state?.model
    },
    dictionary: {
      ...PAGER_DEFAULT_STATE.dictionary,
      ...state?.dictionary,
    },
  },
  stateConfig,
  PAGER_ACTIONS,
  PAGER_VIEW_MODELS,
  [
    pageNumberValidator,
    pageSizeValidator,
  ]
);

export type {RootPagerCore, ContainerPagerCore}
export {createPagerCore};
