import {ActionHandler, IAction} from "../../../core";
import {ISlideToggleInputs} from "../props/props";

enum ESlideToggleActions {
  updateStateFromProps = 'SLIDE_TOGGLE_UPDATE_STATE_FROM_PROPS',
  updateValue = 'SLIDE_TOGGLE_UPDATE_VALUE',
}

interface ISlideToggleAction extends IAction<ESlideToggleActions> {}

abstract class SlideToggleActionHandler extends ActionHandler<ESlideToggleActions> {}

interface ISlideToggleUpdateValueAction extends ISlideToggleAction {
  id: ESlideToggleActions.updateValue;
  value: boolean;
}

interface ISlideToggleUpdateStateFromPropsAction extends ISlideToggleAction {
  id: ESlideToggleActions.updateStateFromProps;
  inputProps: ISlideToggleInputs;
}

export {
  ESlideToggleActions,
  ISlideToggleAction,
  SlideToggleActionHandler,
  ISlideToggleUpdateValueAction,
  ISlideToggleUpdateStateFromPropsAction,
}