import React, { useState } from 'react';
import {
  RadioButton,
  RadioTemplateProps,
  PayloadTemplateProps,
} from '@devexpress/react';

import '@devexpress/react/dist/index.css';

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
            value="string payload"
            selected={selected1}
            payload="string payload"
            onClick={() => setSelected1((current) => !current)}
            onChange={() => console.log('first radio changed')}
          />
        </div>
        <div className="example__play-part">
          <span>Custom templates, component payload: </span>
          <RadioButton
            value="component payload"
            selected={selected2}
            payload={<i>component payload</i>}
            onClick={() => setSelected2((current) => !current)}
            onChange={() => console.log('second radio changed')}
            radioTemplate={CustomRadio}
            payloadTemplate={CustomPayload}
          />
        </div>
      </div>
    </div>
  );
}
