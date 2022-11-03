import React, {useCallback, useContext} from 'react';
import {SlideToggleVM, UpdateValueAction} from '@dx/core/components/slideToggle';

import './dxSlideToggleContainer.scss';
import {useViewModel} from '../../../internal';
import {SlideToggleContext} from '../dxSlideToggleContext';
import {SlideToggleReactVM} from '../types';


const DxSlideToggleContainer = React.memo(() => {
  const core = useContext(SlideToggleContext)!;
  const {model, dictionary} = useViewModel<SlideToggleVM, SlideToggleReactVM>(core.viewModels.general);
  console.log('container: ', model);

  const updateValueCallback = useCallback(
    () => core.dispatch(new UpdateValueAction()),
    []);

  return (
    <div className={`dx-slide-toggle ${dictionary.textPosition === 'left' ? '-left' : '-right'}`}
         onClick={updateValueCallback}>
      {
        dictionary.indicatorView({
          data: {
            value: model.value,
            textPosition: dictionary.textPosition
          }
        })
      }
      {
        dictionary.textView({data: {text: dictionary.text}})
      }
    </div>
  );
});

export {DxSlideToggleContainer};
