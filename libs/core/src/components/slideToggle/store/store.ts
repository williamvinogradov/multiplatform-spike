import {Store, State} from "../../../core";
import {ESlideToggleActions, SlideToggleActionHandlerUpdateStateFromInputs, SlideToggleActionHandlerUpdateValue} from "./actions";
import {ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from "./state";

class SlideToggleStore extends Store<ESlideToggleActions, ISlideToggleState> {
  constructor() {
    const state = new State(SLIDE_TOGGLE_DEFAULT_STATE);
    super(
      state,
      {
        [ESlideToggleActions.updateValue]:
          new SlideToggleActionHandlerUpdateValue(state),
        [ESlideToggleActions.updateStateFromInputs]:
          new SlideToggleActionHandlerUpdateStateFromInputs(state),
      }
    );
  }
}

export { SlideToggleStore }