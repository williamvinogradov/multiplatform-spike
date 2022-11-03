import {ModelPropertyConfigMap, StateValue, ContainerCore, createCore, RootCore} from '../../../internal';
import {SLIDE_TOGGLE_ACTIONS, SlideToggleActions} from './actions';
import {SLIDE_TOGGLE_DEFAULT_STATE, SlideToggleDictionary, SlideToggleModel} from './state';
import {SLIDE_TOGGLE_VIEW_MODELS, SlideToggleViewModels} from './viewModels';


interface RootSlideToggleCore extends RootCore<SlideToggleModel, SlideToggleDictionary> {
}

interface ContainerSlideToggleCore extends ContainerCore<SlideToggleActions, SlideToggleViewModels> {
}

const createSlideToggleCore = (
  state: StateValue<Partial<SlideToggleModel>, Partial<SlideToggleDictionary>>,
  stateConfig: ModelPropertyConfigMap<SlideToggleModel>,
): [RootSlideToggleCore, ContainerSlideToggleCore] =>
  createCore(
    {
      model: {
        ...SLIDE_TOGGLE_DEFAULT_STATE.model,
        ...state?.model,
      },
      dictionary: {
        ...SLIDE_TOGGLE_DEFAULT_STATE.dictionary,
        ...state?.dictionary,
      }
    },
    stateConfig,
    SLIDE_TOGGLE_ACTIONS,
    SLIDE_TOGGLE_VIEW_MODELS,
  );


export type {RootSlideToggleCore, ContainerSlideToggleCore};
export {createSlideToggleCore};
