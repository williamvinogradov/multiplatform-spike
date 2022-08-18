import {DxLogic, getViewModel} from '../../core';
import {ISimpleGridInputs, ISimpleGridPaging, ISimpleGridState} from '../../types/simpleGrid';
import {updatePagingActions} from './actions/updatePagingActions';
import {updateStateFromPropsAction} from './actions/updateStateFromPropsAction';
import {updateStateFromPagingPropsAction} from './actions/updateStateFromPagingPropsAction';
import {
  getSimpleGridPagingSlice,
  getSimpleGridPagingVM,
  getSimpleGridTableHeaderSlice,
  getSimpleGridTableHeaderVM,
  getSimpleGridTableRowsSlice,
  getSimpleGridTableRowsVM,
} from './viewModels';

class DxSimpleGridLogic<TData> extends DxLogic<ISimpleGridState<TData>> {
  headerVM$ = this.state$.pipe(getViewModel(getSimpleGridTableHeaderSlice, getSimpleGridTableHeaderVM));
  rowsVM$ = this.state$.pipe(getViewModel(getSimpleGridTableRowsSlice, getSimpleGridTableRowsVM));
  pagingVM$ = this.state$.pipe(getViewModel(getSimpleGridPagingSlice, getSimpleGridPagingVM));

  updateStateFromPropsAction(props: Partial<ISimpleGridInputs<TData>>): void {
    this.state.updateState(updateStateFromPropsAction(props));
  }

  updateStateFromPagingPropsAction(props: Partial<ISimpleGridPaging>): void {
    this.state.updateState(updateStateFromPagingPropsAction(props));
  }

  updatePaging(paging: Partial<ISimpleGridPaging>): void {
    this.state.updateState(updatePagingActions(paging));
  }
}

export {
  DxSimpleGridLogic,
}
