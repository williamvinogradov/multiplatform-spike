import {LogicFacade, State} from "../../core";
import {ISlideToggleOutputs} from "./props/props";
import {ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from "./state/state";
import {ISlideToggleViewModel, SlideToggleViewModelGenerator} from "./viewModel/viewModel";
import {
  SlideToggleActionHandlerUpdateValue,
  SlideToggleActionHandlerUpdateStateFromInputs,
  ESlideToggleActions
} from "./actions";

class SlideToggleLogicFacade
  extends LogicFacade<
    ISlideToggleOutputs,
    ESlideToggleActions,
    ISlideToggleState,
    ISlideToggleViewModel
    > {
  constructor() {
    const state = new State(SLIDE_TOGGLE_DEFAULT_STATE);
    super(
      state,
      {
        [ESlideToggleActions.updateValue]:
          new SlideToggleActionHandlerUpdateValue(state),
        [ESlideToggleActions.updateStateFromInputs]:
          new SlideToggleActionHandlerUpdateStateFromInputs(state),
      },
      new SlideToggleViewModelGenerator(),
    );
  }
}

export { SlideToggleLogicFacade };