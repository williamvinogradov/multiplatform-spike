import React, { ComponentType, ReactElement, useMemo } from 'react';

export type PayloadType = string | ReactElement;

export interface RadioTemplateProps {
  selected: boolean;
}

export interface PayloadTemplateProps {
  payload: PayloadType;
}

export interface RadioButtonProps {
  selected: boolean;
  selectedChange: React.MouseEventHandler;
  payload: PayloadType;
  radioTemplate?: ComponentType<RadioTemplateProps>;
  payloadTemplate?: ComponentType<PayloadTemplateProps>;
}

const DefaultRadioTemplate = React.memo<RadioTemplateProps>(({ selected }) => {
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
  radioTemplate,
  payloadTemplate,
}: RadioButtonProps) {
  const RadioComponent = useMemo(
    () => radioTemplate || DefaultRadioTemplate,
    [radioTemplate]
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
      <RadioComponent selected={selected} />
      <PayloadComponent payload={payload} />
    </span>
  );
}
