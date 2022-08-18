import React from 'react';

interface IDxSimpleGridHeaderCell {
  label: string;
  template: (label: string) => JSX.Element;
}

function DxSimpleGridHeaderCell({label, template}: IDxSimpleGridHeaderCell) {
  return (
    <div className="dx-simple-grid-table__header-cell">
      {template(label)}
    </div>
  )
}

export {
  IDxSimpleGridHeaderCell,
  DxSimpleGridHeaderCell,
}
