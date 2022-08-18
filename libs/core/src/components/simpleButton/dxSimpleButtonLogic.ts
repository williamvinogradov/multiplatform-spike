import {DxLogic, watch} from '../../core';
import {ISimpleButtonState} from '../../types/simpleButton';

// NOTE: This is short class logic, but it's bad for unit testing.
class DxSimpleButtonLogic extends DxLogic<ISimpleButtonState> {
  viewModel$ = this.state$.pipe(watch((state) => state));

  updateStateFromProps(props: Partial<ISimpleButtonState>): void {
    this.state.updateState((state) => [{
      ...state,
      ...props,
      }]
    );
  }
}

export {
  DxSimpleButtonLogic,
}
