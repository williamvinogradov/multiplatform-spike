import {
  ESimpleGridColumnTypes,
  ISimpleGridColumnGetter,
  ISimpleGridColumnKey,
  ISimpleGridState
} from '../../../../types/simpleGrid';
import {filterData} from './filterData';
import {ISimpleGridTableRowsSlice, ISimpleGridTableRowsVM, ISimpleGridTableRowsVMDataBaseCell} from './types';
import {createRowDataGetterVM, createRowDataKeyVM} from './utils';


function getSimpleGridTableRowsSlice<TData>(
  state: ISimpleGridState<TData>
): ISimpleGridTableRowsSlice<TData> {
  return {
    data: state.data,
    columns: state.columns,
    paging: state.paging,
  };
}

function getSimpleGridTableRowsVM<TData>(
  slice: ISimpleGridTableRowsSlice<TData>
): ISimpleGridTableRowsVM<TData> {
  const cellsData: ISimpleGridTableRowsVMDataBaseCell[] = [];

  slice.columns.forEach((column) => {
    switch (column.type) {
      case ESimpleGridColumnTypes.getter:
        const dataGetterColumn = column as ISimpleGridColumnGetter<TData, unknown>;
        cellsData.push(createRowDataGetterVM(dataGetterColumn))
        break;
      default:
        const dataKeyColumn = column as ISimpleGridColumnKey<TData>
        cellsData.push(createRowDataKeyVM<TData>(dataKeyColumn))
        break;
    }
  });

  const filteredData = filterData(slice.data, slice.paging);

  return {
    data: filteredData.map((data) => ({
      recordId: JSON.stringify(data),
      data,
    })),
    cellsData
  };
}

export {
  ISimpleGridTableRowsVM,
  getSimpleGridTableRowsSlice,
  getSimpleGridTableRowsVM
}
