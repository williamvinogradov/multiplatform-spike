import React, {useCallback, useEffect, useMemo} from 'react';
import {DxSlideToggleLogic, DxSlideToggleOutputs, SlideToggleState} from '@dx/core/components/slideToggle';
import {useOutput, useViewModel} from '../../common/hooks';
import {IDxSlideToggleProps, SLIDE_TOGGLE_DEFAULT_PROPS} from './dxSlideToggleProps';

import './dxSlideToggle.scss';

function DxSlideToggle(props: IDxSlideToggleProps) {
  const state = useMemo(() => new SlideToggleState(), []);
  const logic = useMemo(() => new DxSlideToggleLogic(state), []);
  const {outputs$} = useMemo(() => new DxSlideToggleOutputs(state), []);

  const viewModel = useViewModel(logic.viewModel$);

  useEffect(() => logic.updateStateFromPropsAction({
    text: props.text,
    textPosition: props.textPosition,
    value: props.value,
  }), [props]);
  useOutput(outputs$.valueChange, props.valueChange);

  const updateValue = useCallback(() => logic.updateValueAction(!viewModel?.value || false), [viewModel]);

  return (
    <React.Fragment>
      {
        viewModel &&
        <div className={`dx-slide-toggle ${viewModel?.textPosition === 'left' ? '-left' : '-right'}`}
             onClick={updateValue}>
          {
            props.indicatorView && props.indicatorView({
            ...viewModel,
          })
          }
          {
            props.textView && props.textView({
              ...viewModel,
            })
          }
        </div>
      }
    </React.Fragment>
  )
}

DxSlideToggle.defaultProps = SLIDE_TOGGLE_DEFAULT_PROPS;

export {
  IDxSlideToggleProps,
  DxSlideToggle,
}
