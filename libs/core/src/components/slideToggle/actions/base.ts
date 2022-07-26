import {Action, ActionHandler} from "../../../core";
import {ISlideToggleState} from "../state/state";
import {ESlideToggleActions} from "./actionTypes";

abstract class SlideToggleAction extends Action<ESlideToggleActions> {}

abstract class SlideToggleActionHandler extends ActionHandler<ESlideToggleActions, ISlideToggleState> {}

export {
  SlideToggleAction,
  SlideToggleActionHandler,
}