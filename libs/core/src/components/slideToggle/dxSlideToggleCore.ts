import {DxComponent, watch, watchOutput} from '../../common';
import { updateStateFromPropsAction } from './actions/updateStateFromPropsAction';
import { updateValueAction } from './actions/updateValueAction';
import {ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from './state';

class DxSlideToggleCore extends DxComponent<ISlideToggleState> {
  viewModel$ = this.state$.pipe(watch((state) => state));

  valueChangeOutput$ = this.state$.pipe(watchOutput(({value}) => value));

  constructor() {
    super(SLIDE_TOGGLE_DEFAULT_STATE);
  }

  updateStateFromProps(props: Partial<ISlideToggleState>): void {
    this.state.updateState(updateStateFromPropsAction(props));
  }

  updateValue(value: boolean): void {
    this.state.updateState(updateValueAction(value));
  }
}

export {DxSlideToggleCore};
