import {State, Store} from "../../../core";
import {ESimpleButtonActions, SimpleButtonActionHandlerUpdateStateFromInputs} from "./actions";
import {ISimpleButtonState, SIMPLE_BUTTON_DEFAULT_STATE} from "./state";

class SimpleButtonStore extends Store<ESimpleButtonActions, ISimpleButtonState> {
  constructor() {
    const state = new State<ISimpleButtonState>(SIMPLE_BUTTON_DEFAULT_STATE);
    super(
      state, {
        [ESimpleButtonActions.updateStateFromInputs]:
          new SimpleButtonActionHandlerUpdateStateFromInputs(state)
      }
    );
  }
}

export {SimpleButtonStore}