import {ESimpleGridColumnTypes, ISimpleGridColumnGetter, ISimpleGridColumnKey} from '../../../../types/simpleGrid';
import {ISimpleGridTableRowsVMDataGetterCell, ISimpleGridTableRowsVMDataKeyCell} from './types';


function createRowDataKeyVM<TData>(column: ISimpleGridColumnKey<TData>)
  : ISimpleGridTableRowsVMDataKeyCell<TData> {
  return {
    type: ESimpleGridColumnTypes.key,
    recordId: `${column.keyName.toString()}-${column.dataTemplate}`,
    keyName: column.keyName,
    template: column.dataTemplate,
  }
}

function createRowDataGetterVM<TData>(column: ISimpleGridColumnGetter<TData, unknown>)
  : ISimpleGridTableRowsVMDataGetterCell<TData> {
  return {
    type: ESimpleGridColumnTypes.getter,
    recordId: `${column.valueGetter}-${column.dataTemplate}`,
    valueGetter: column.valueGetter,
    template: column.dataTemplate,
  }
}

export {
  createRowDataKeyVM,
  createRowDataGetterVM,
}
