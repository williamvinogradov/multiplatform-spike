import {Store} from "../../core";
import {ESlideToggleActions} from "./actions/actions";
import {ISlideToggleState, SlideToggleState} from "./state";
import {SlideToggleUpdateValueActionHandler} from "./actions/updateValue";
import {ISlideToggleViewModel} from "./viewModel/interfaces";
import {SlideToggleViewModelGenerator} from "./viewModel/viewModel";
import {SlideToggleUpdateStateFromPropsActionHandler} from "./actions/updateValueFromProps";
import {ISlideToggleOutputs} from "./props/props";

class SlideToggleStore extends Store<ESlideToggleActions, ISlideToggleState, ISlideToggleViewModel, ISlideToggleOutputs> {
  constructor() {
    const state = new SlideToggleState();
    const viewModelGenerator = new SlideToggleViewModelGenerator();

    super(
      state,
      viewModelGenerator,
      {
        [ESlideToggleActions.updateValue]:
          new SlideToggleUpdateValueActionHandler(state),
        [ESlideToggleActions.updateStateFromProps]:
          new SlideToggleUpdateStateFromPropsActionHandler(state),
      },
      {
        valueChanged: (state) => state.model.value,
      }
    );
  }
}

export { SlideToggleStore };