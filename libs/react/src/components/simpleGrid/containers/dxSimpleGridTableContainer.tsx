import {DxSimpleGridLogic} from '@dx/core/components/simpleGrid';
import React from 'react';
import {useReactContext, useViewModel} from '../../../common/hooks';
import {DxSimpleGridContext} from '../dxSimpleGridContext';
import {DxSimpleGridRowContainer} from './dxSimpleGridRowContainer';
import {DxSimpleGridHeaderCell} from './dxSimpleGridHeaderCell';

import './dxSimpleGridTableContainer.scss';

function DxSimpleGridTableContainer<TData>() {
  const logic = useReactContext(DxSimpleGridContext) as DxSimpleGridLogic<TData>;

  const headerVM = useViewModel(logic.headerVM$);
  const rowsVM = useViewModel(logic.rowsVM$);

  return (
    <div className="dx-simple-grid-table">
      <div className="dx-simple-grid-table__header">
        {
          headerVM && headerVM.cells.map(({recordId, label, template}) => {
            const headerCellTemplate = template as THeaderCellTemplate;
            return <DxSimpleGridHeaderCell key={recordId} label={label} template={headerCellTemplate}/>
          })
        }
      </div>
      <div className="dx-simple-grid-table__body">
        {
          rowsVM && rowsVM.data.map((row) => {
            return <DxSimpleGridRowContainer
              key={row.recordId}
              rowRecordId={row.recordId}
              data={row.data}
              cellData={rowsVM.cellsData}/>
          })
        }
      </div>
    </div>
  )
}

export {DxSimpleGridTableContainer}
