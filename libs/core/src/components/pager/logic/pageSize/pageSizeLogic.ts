import {DxLogic, getViewModel} from '../../../../common';
import {IPagerPageSizeState, IPagerState} from '../../state';
import {selectPageSizeAction} from './actions/selectPageSizeAction';
import {updateFromPropsAction} from './actions/updateFromPropsAction';
import {getPagerPageSizeSlice, getPagerPageSizeVM} from './viewModels/pageSizeVM';

class PageSizeLogic extends DxLogic<IPagerState> {
  viewModel$ = this.state$.pipe(getViewModel(getPagerPageSizeSlice, getPagerPageSizeVM));

  updateFromProps(pageSizeStatePart: Partial<IPagerPageSizeState>, normalize = true): void {
    this.state.updateState(updateFromPropsAction(pageSizeStatePart, normalize));
  }

  selectPageSize(selectedPageSize: number): void {
    this.state.updateState(selectPageSizeAction(selectedPageSize));
  }
}

export {PageSizeLogic};
