import {DxLogic, watch} from '../../common';
import {ISlideToggleState} from '../../types/slideToggle';
import {updateStateFromPropsAction} from './actions/updateStateFromPropsAction';
import {updateValueAction} from './actions/updateValue';

class DxSlideToggleLogic extends DxLogic<ISlideToggleState> {
  viewModel$ = this.state$.pipe(watch((state) => state));

  updateStateFromPropsAction(props: Partial<ISlideToggleState>): void {
    this.state.updateState(updateStateFromPropsAction(props));
  }

  updateValueAction(value: boolean): void {
    this.state.updateState(updateValueAction(value));
  }
}

export {
  DxSlideToggleLogic,
}
