import React, {
  useId,
  forwardRef,
  useContext,
  useState,
  ChangeEventHandler,
} from 'react';
import { Actions } from '@devexpress/components';
import {
  RadioButtonProps,
  LabelTemplateProps,
  RadioTemplateProps,
  RadioButtonRenderProps,
  CoreBoundRadioButtonProps,
  RadioButtonRenderType,
} from './types';
import { RadioGroupContext } from '../radio-group/radio-group-context';
import { useCoreState } from '../../internal/hooks';

function DefaultRadioTemplate({ checked = false }: RadioTemplateProps) {
  return <span>{checked ? '◉' : '◎'}</span>;
}

function DefaultLabelTemplate({ label }: LabelTemplateProps) {
  return <span>{label}</span>;
}

function RadioButtonInternal({
  name,
  value,
  checked,
  defaultChecked,
  onClick,
  onChange,
  label,
  radioTemplate,
  labelTemplate,
  inputId,
  inputRef,
}: RadioButtonRenderProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const RadioComponent = radioTemplate || DefaultRadioTemplate;
  const LabelComponent = labelTemplate || DefaultLabelTemplate;

  const isUncontrolled = checked === undefined;

  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = isUncontrolled
    ? (e) => {
      setInternalChecked(e.target.checked);
      onChange?.(e);
      return true;
    }
    : onChange;

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
          defaultChecked={defaultChecked}
          onClick={onClick}
          onChange={handleChange}
        />
        <RadioComponent checked={isUncontrolled ? internalChecked : checked} />
        {label && <LabelComponent label={label} />}
      </label>
    </span>
  );
}

function withRadioGroup(RadioButton: RadioButtonRenderType) {
  return ({
    radioGroupCore: { dispatcher, stateManager },
    value,
    ...props
  }: CoreBoundRadioButtonProps) => {
    const coreState = useCoreState(stateManager);

    const checked = coreState.value === value;
    const handleOnChange = () => {
      dispatcher.dispatch(Actions.updateValue, {
        value,
      });
      return true;
    };

    return (
      <RadioButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        value={value}
        checked={checked}
        onChange={handleOnChange}
      />
    );
  };
}

const CoreBoundRadioButton = withRadioGroup(RadioButtonInternal);

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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        ) : (
          <RadioButtonInternal
            inputId={inputId}
            inputRef={inputRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        )}
      </>
    );
  },
);
