import {ActionHandler, UpdateStateFromInputsAction} from "../../../core";
import {ISimpleButtonInputs} from "../contracts/contracts";
import {ISimpleButtonState} from "./state";

enum ESimpleButtonActions {
  updateStateFromInputs = 'SIMPLE_BUTTON_UPDATE_STATE_FROM_PROPS',
}

abstract class SimpleButtonActionHandler extends ActionHandler<ESimpleButtonActions, ISimpleButtonState>{}

class SimpleButtonActionUpdateStateFromInputs
  extends UpdateStateFromInputsAction<ESimpleButtonActions.updateStateFromInputs, ISimpleButtonInputs> {
  constructor(inputs: ISimpleButtonInputs) {
    super(ESimpleButtonActions.updateStateFromInputs, inputs);
  }
}

class SimpleButtonActionHandlerUpdateStateFromInputs extends SimpleButtonActionHandler {
  handleAction({inputs: {text}}: SimpleButtonActionUpdateStateFromInputs): void {
    this.state.updateState(() => ({
      text,
    }))
  }

}

export {
  ESimpleButtonActions,
  SimpleButtonActionUpdateStateFromInputs,
  SimpleButtonActionHandlerUpdateStateFromInputs
}