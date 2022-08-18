import {
  ISimpleGridTableRowsVMDataBaseCell,
  ISimpleGridTableRowsVMDataGetterCell,
  ISimpleGridTableRowsVMDataKeyCell
} from '@dx/core/components/simpleGrid';

function asDataGetter<TData>(
  cell: ISimpleGridTableRowsVMDataBaseCell
): ISimpleGridTableRowsVMDataGetterCell<TData> {
  return cell as ISimpleGridTableRowsVMDataGetterCell<TData>;
}

function asDataKey<TData>(
  cell: ISimpleGridTableRowsVMDataBaseCell
): ISimpleGridTableRowsVMDataKeyCell<TData> {
  return cell as ISimpleGridTableRowsVMDataKeyCell<TData>;
}

export {
  asDataGetter,
  asDataKey,
}
