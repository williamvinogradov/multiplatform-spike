import React, { useId, forwardRef, useContext } from 'react';
import { Actions } from '@devexpress/components';
import {
  RadioButtonProps,
  LabelTemplateProps,
  RadioTemplateProps,
  RadioButtonRenderProps,
  CoreBoundRadioButtonProps,
} from './types';
import { RadioGroupContext } from '../radio-group/radio-group-context';
import { useCoreState } from '../../internal/hooks';

const DefaultRadioTemplate = ({ checked = false }: RadioTemplateProps) => (
  <span>{checked ? '◉' : '◎'}</span>
);

const DefaultLabelTemplate = ({ label }: LabelTemplateProps) => (
  <span>{label}</span>
);

const renderRadioButton = ({
  name,
  value,
  checked,
  onClick,
  onChange,
  label,
  radioTemplate,
  labelTemplate,
  inputId,
  inputRef,
}: RadioButtonRenderProps) => {
  const RadioComponent = radioTemplate || DefaultRadioTemplate;
  const LabelComponent = labelTemplate || DefaultLabelTemplate;

  return (
    <span>
      <label
        htmlFor={inputId}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          style={{ display: 'none' }}
          type="radio"
          value={value}
          checked={checked}
          onClick={onClick}
          onChange={onChange}
        />
        <RadioComponent checked={checked} />
        {label && <LabelComponent label={label} />}
      </label>
    </span>
  );
};

const CoreBoundRadioButton = ({
  radioGroupCore: { dispatcher, stateManager },
  ...restProps
}: CoreBoundRadioButtonProps) => {
  const coreState = useCoreState(stateManager);

  const checked = coreState.value === restProps.value;
  const handleOnChange = () => {
    dispatcher.dispatch(Actions.updateValue, {
      value: restProps.value,
    });
    return true;
  };
  return renderRadioButton({ ...restProps, checked, onChange: handleOnChange });
};

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, inputRef) => {
    const radioGroupCore = useContext(RadioGroupContext);
    const inputId = useId();

    return (
      <>
        {radioGroupCore ? (
          <CoreBoundRadioButton
            radioGroupCore={radioGroupCore}
            inputId={inputId}
            inputRef={inputRef}
            name={props.name}
            value={props.value}
            label={props.label}
            radioTemplate={props.radioTemplate}
            labelTemplate={props.labelTemplate}
            checked={props.checked}
            onClick={props.onClick}
            onChange={props.onChange}
          />
        ) : (
          renderRadioButton({ inputId, inputRef, ...props })
        )}
      </>
    );
  },
);
