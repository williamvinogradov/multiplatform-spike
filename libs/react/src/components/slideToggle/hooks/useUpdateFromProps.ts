import {useEffect} from 'react';
import {DxSlideToggleCore} from '@dx/core/components/slideToggle';
import {IDxSlideToggleProps} from '../types';

function useUpdateFromProps(
  component: DxSlideToggleCore,
  props: IDxSlideToggleProps,
) {
  useEffect(() => {
    component.updateStateFromProps({
      config: {
        text: props.text!,
        textPosition: props.textPosition!,
      },
      templates: {
        indicatorView: props.indicatorViewTemplate,
        textView: props.textViewTemplate,
      }
    })
  }, [props.text, props.textPosition, props.indicatorViewTemplate, props.textViewTemplate]);
}

export {useUpdateFromProps};
