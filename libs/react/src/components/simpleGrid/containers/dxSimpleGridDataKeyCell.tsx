import React from 'react';

interface IDxSimpleGridDataKeyCell<TData> {
  data: TData,
  keyName: keyof TData,
  template: TDataKeyCellTemplate<TData, keyof TData>,
}

function DxSimpleGridDataKeyCell<TData>({data, keyName, template}: IDxSimpleGridDataKeyCell<TData>) {
  const dataToRender = data[keyName];

  return (
    <div className="dx-simple-grid-row__cell">
      {template(dataToRender)}
    </div>
  )
}

export {
  IDxSimpleGridDataKeyCell,
  DxSimpleGridDataKeyCell
}
