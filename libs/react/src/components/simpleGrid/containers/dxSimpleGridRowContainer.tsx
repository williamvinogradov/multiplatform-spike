import {
  ISimpleGridTableRowsVMDataBaseCell,
  ISimpleGridTableRowsVMDataGetterCell,
  ISimpleGridTableRowsVMDataKeyCell
} from '@dx/core/components/simpleGrid';
import React from 'react';
import {ESimpleGridColumnTypes} from '@dx/core/types/simpleGrid';

import {DxSimpleGridDataKeyCell} from './dxSimpleGridDataKeyCell';
import {DxSimpleGridDataGetterCell} from './dxSimpleGridDataGetterCell';

import './dxSimpleGridRowContainer.scss';

interface IDxSimpleGridRowProps<TData> {
  data: TData;
  cellData: ISimpleGridTableRowsVMDataBaseCell[];
  rowRecordId: string;
}

function DxSimpleGridRowContainer<TData>(props: IDxSimpleGridRowProps<TData>) {
  return (
    <div className="dx-simple-grid-row">
      {
        props.cellData
          .map((cell) => {
            switch (cell.type) {
              case ESimpleGridColumnTypes.getter:
                const dataGetterCell = cell as ISimpleGridTableRowsVMDataGetterCell<TData>;
                const dataGetterCellTemplate = dataGetterCell.template as TDataGetterCellTemplate<unknown>;
                return <DxSimpleGridDataGetterCell
                  key={`${props.rowRecordId}-${dataGetterCell.recordId}`}
                  data={props.data}
                  valueGetter={dataGetterCell.valueGetter}
                  template={dataGetterCellTemplate}/>
              default:
                const dataKeyCell = cell as ISimpleGridTableRowsVMDataKeyCell<TData>;
                const dataKeyCellTemplate = dataKeyCell.template as TDataKeyCellTemplate<TData, keyof TData>;
                return <DxSimpleGridDataKeyCell
                  key={`${props.rowRecordId}-${dataKeyCell.recordId}`}
                  data={props.data}
                  keyName={dataKeyCell.keyName}
                  template={dataKeyCellTemplate}/>
            }
          })
      }
    </div>
  )
}

export {
  DxSimpleGridRowContainer
}
