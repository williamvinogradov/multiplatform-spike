import React, { ComponentType, ReactElement, useMemo } from 'react';

export type PayloadType = string | ReactElement;

export interface SelectionControlTemplateProps {
  selected: boolean;
}

export interface PayloadTemplateProps {
  payload: PayloadType;
}

export interface RadioButtonProps {
  selected: boolean;
  selectedChange: React.MouseEventHandler;
  payload: PayloadType;
  selectionControlTemplate?: ComponentType<SelectionControlTemplateProps>;
  payloadTemplate?: ComponentType<PayloadTemplateProps>;
}

const DefaultSelectionControlTemplate =
  React.memo<SelectionControlTemplateProps>(({ selected }) => {
    return <span>{selected ? '◉' : '◎'}</span>;
  });

const DefaultPayloadTemplate = React.memo<PayloadTemplateProps>(
  ({ payload }) => {
    return <span>{payload}</span>;
  }
);

export function RadioButton({
  selected,
  selectedChange,
  payload,
  selectionControlTemplate,
  payloadTemplate,
}: RadioButtonProps) {
  const SelectionControlComponent = useMemo(
    () => selectionControlTemplate || DefaultSelectionControlTemplate,
    [selectionControlTemplate]
  );
  const PayloadComponent = useMemo(
    () => payloadTemplate || DefaultPayloadTemplate,
    [payloadTemplate]
  );

  return (
    <span
      style={{ cursor: 'pointer', userSelect: 'none' }}
      onClick={selectedChange}
      role="radio"
      aria-checked={selected}
    >
      <SelectionControlComponent selected={selected} />
      <PayloadComponent payload={payload} />
    </span>
  );
}
