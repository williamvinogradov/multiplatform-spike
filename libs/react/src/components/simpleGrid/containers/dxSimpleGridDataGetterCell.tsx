import React from 'react';

interface IDxSimpleGridDataGetterCell<TData> {
  data: TData,
  valueGetter: (data: TData) => unknown,
  template: TDataGetterCellTemplate<unknown>,
}

function DxSimpleGridDataGetterCell<TData, TValue>({data, valueGetter, template}: IDxSimpleGridDataGetterCell<TData>) {
  const dataToRender = valueGetter(data);

  return (
    <div className="dx-simple-grid-row__cell">
      {template(dataToRender)}
    </div>
  )
}

export {
  IDxSimpleGridDataGetterCell,
  DxSimpleGridDataGetterCell
}
