import React, { useState } from 'react';
import {
  RadioButton,
  RadioTemplateProps,
  PayloadTemplateProps,
} from '@devexpress/react';

const CustomRadio: React.FC<RadioTemplateProps> = ({ selected }) => (
  <span>{selected ? '+' : '-'}</span>
);

const CustomPayload: React.FC<PayloadTemplateProps> = ({ payload }) => (
  <b>{payload}</b>
);

export function RadioButtonExample() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  return (
    <div className="example">
      <div className="example__title">Radio button example:</div>
      <div className="example__control">
        <div className="example__play-part">
          <span>Default templates, text payload: </span>
          <RadioButton
            selected={selected1}
            payload="string payload"
            selectedChange={() => setSelected1((current) => !current)}
          />
        </div>
        <div className="example__play-part">
          <span>Custom templates, component payload: </span>
          <RadioButton
            selected={selected2}
            payload={<i>component payload</i>}
            selectedChange={() => setSelected2((current) => !current)}
            radioTemplate={CustomRadio}
            payloadTemplate={CustomPayload}
          />
        </div>
      </div>
    </div>
  );
}
