import {ESimpleGridColumnTypes, ISimpleGridColumnBase, ISimpleGridPaging} from '../../../../types/simpleGrid';

// (data: TData[keyof TData]) => TFrameworkTemplate
// (value: unknown) => TFrameworkTemplate;

interface ISimpleGridTableVMData<TData> {
  data: TData;
  recordId: string;
}

interface ISimpleGridTableRowsVMDataBaseCell {
  type: ESimpleGridColumnTypes;
  recordId: string;
}

interface ISimpleGridTableRowsVMDataKeyCell<TData>
  extends ISimpleGridTableRowsVMDataBaseCell {
  type: ESimpleGridColumnTypes.key;
  keyName: keyof TData;
  template: unknown;
}

interface ISimpleGridTableRowsVMDataGetterCell<TData>
  extends ISimpleGridTableRowsVMDataBaseCell {
  type: ESimpleGridColumnTypes.getter;
  valueGetter: (data: TData) => unknown;
  template: unknown;
}

interface ISimpleGridTableRowsSlice<TData> {
  data: TData[],
  columns: ISimpleGridColumnBase[],
  paging?: ISimpleGridPaging,
}

interface ISimpleGridTableRowsVM<TData> {
  data: ISimpleGridTableVMData<TData>[];
  cellsData: ISimpleGridTableRowsVMDataBaseCell[];
}

export type {
  ISimpleGridTableVMData,
  ISimpleGridTableRowsVMDataBaseCell,
  ISimpleGridTableRowsVMDataKeyCell,
  ISimpleGridTableRowsVMDataGetterCell,
  ISimpleGridTableRowsSlice,
  ISimpleGridTableRowsVM,
}
