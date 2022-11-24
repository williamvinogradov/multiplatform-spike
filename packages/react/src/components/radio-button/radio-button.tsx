import React, { useMemo } from 'react';
import {
  PayloadTemplateProps,
  RadioButtonProps,
  RadioTemplateProps,
} from './types';
import './style.scss';

const RADIO_BUTTON_CLASS = 'dx-radiobutton';
const RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
const RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
const RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
const RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';

const DefaultRadioTemplate = React.memo<RadioTemplateProps>(({ selected }) => (
  <span>{selected ? '◉' : '◎'}</span>
));

const DefaultDivRadioTemplate = React.memo<RadioTemplateProps>(
  ({ selected }) => {
    const iconClasses = [RADIO_BUTTON_ICON_CLASS];
    const iconDotClasses = [RADIO_BUTTON_ICON_DOT_CLASS];
    if (selected) {
      iconClasses.push(RADIO_BUTTON_CHECKED_CLASS);
      iconDotClasses.push(RADIO_BUTTON_ICON_CHECKED_CLASS);
    }
    const iconClassName = iconClasses.join(' ');
    const iconDotClassName = iconDotClasses.join(' ');
    return (
      <div className={iconClassName}>
        <div className={iconDotClassName}></div>
      </div>
    );
  }
);

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
    () => radioTemplate || DefaultDivRadioTemplate,
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
