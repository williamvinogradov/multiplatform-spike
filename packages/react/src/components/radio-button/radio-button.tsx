import React, { ComponentType, ReactElement, useMemo } from 'react';
import {
  PayloadTemplateProps,
  RadioButtonProps,
  RadioTemplateProps,
} from './types';

const RADIO_BUTTON_CLASS = 'dx-radiobutton';

const DefaultRadioTemplate = React.memo<RadioTemplateProps>(({ selected }) => (
  <span>{selected ? '◉' : '◎'}</span>
));

const DefaultPayloadTemplate = React.memo<PayloadTemplateProps>(
  ({ payload }) => <span>{payload}</span>
);

export function RadioButton({
  value,
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
    <label
      className={RADIO_BUTTON_CLASS}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <span>
        <input
          type="radio"
          value={value}
          style={{ display: 'none' }}
          checked={selected}
          onClick={selectedChange}
        />
        <RadioComponent selected={selected} />
      </span>
      <span>
        <PayloadComponent payload={payload} />
      </span>
    </label>
  );
}
