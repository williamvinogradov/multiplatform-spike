/* eslint-disable react/destructuring-assignment */
import {
  Actions,
} from '@devexpress/components';
import React, {
  memo, useCallback,
} from 'react';
import { useRequiredContext } from '../../internal/hooks';
import { RadioGroupContext, RadioGroupContextType } from './radio-group-context';
import { useViewModel } from '../../internal/hooks/use-view-model';

// NOTE: It's a temporary component for the RadioGroup development
function RadioButtonTmpInternal<T>(props: RadioButtonPropsTmp<T>) {
  const {
    viewModelManager,
    dispatcher,
  } = useRequiredContext<RadioGroupContextType<T>>(RadioGroupContext);
  const { radioButtonViewModel } = viewModelManager.get();
  // Vitik: TODO improve typing radioButtonViewModel should be required
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const isChecked = useViewModel(radioButtonViewModel!);
  const { checked } = isChecked(props.value);

  const selectOption = useCallback(() => {
    dispatcher.dispatch(Actions.updateValue, { value: props.value });
  }, [props.value]);

  return (
    // eslint-disable-next-line
    <div
      onClick={selectOption}
      style={{ margin: '10px', cursor: 'pointer' }}
    >
      {checked ? '✅' : '❌'}
    </div>
  );
}

export type RadioButtonPropsTmp<T> = {
  value: T;
};

export const RadioButtonTmp = memo(RadioButtonTmpInternal) as typeof RadioButtonTmpInternal;
