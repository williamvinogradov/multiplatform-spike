import {
  DxLogic,
  getViewModel,
} from '../../core';
import {IPagerState} from '../../types/pager';
import {selectPageAction} from './actions/selectPageAction';
import {selectPageSizeAction} from './actions/selectPageSizeAction';
import {updateStateFromPropsAction} from './actions/updateStateFromPropsAction';
import {
  getPagerPageNumberSlice,
  getPagerPageNumberVM,
  getPagerPageSizeSlice,
  getPagerPageSizeVM
} from './viewModels';


class DxPagerLogic extends DxLogic<IPagerState> {
  pageSizeVM$ = this.state$.pipe(getViewModel(getPagerPageSizeSlice, getPagerPageSizeVM));
  pageNumberVM$ = this.state$.pipe(getViewModel(getPagerPageNumberSlice, getPagerPageNumberVM));

  updateStateFromPropsAction(props: Partial<IPagerState>): void {
    this.state.updateState(updateStateFromPropsAction(props));
  }

  selectPageAction(selectedPage: number): void {
    this.state.updateState(selectPageAction(selectedPage));
  }

  selectPageSizeAction(selectedPageSize: number): void {
    this.state.updateState(selectPageSizeAction(selectedPageSize));
  }
}

export {
  DxPagerLogic
}
