import {Action, ActionMap, ActionHandler} from '../../../internal';
import {SlideToggleDictionary, SlideToggleModel, SlideToggleState} from './state';


enum SlideToggleActions {
  updateValue = 'SLIDE_TOGGLE_UPDATE_VALUE',
}

class UpdateValueAction extends Action<SlideToggleActions> {
  readonly type = SlideToggleActions.updateValue;
}

const updateValueHandler: ActionHandler<SlideToggleActions, SlideToggleModel, SlideToggleDictionary> =
  ({model}: SlideToggleState): SlideToggleModel => {
    return {value: !model.value};
  };

const SLIDE_TOGGLE_ACTIONS: ActionMap<SlideToggleActions, SlideToggleModel, SlideToggleDictionary> = {
  [SlideToggleActions.updateValue]: updateValueHandler,
}

export {
  SlideToggleActions,
  SLIDE_TOGGLE_ACTIONS,
  UpdateValueAction,
};
