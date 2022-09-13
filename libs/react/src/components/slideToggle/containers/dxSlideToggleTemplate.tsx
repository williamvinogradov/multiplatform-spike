import React from 'react';
import {ISlideToggleReactVM} from '../types';

import './dxSlideToggleTemplate.scss';

interface IDxSLideToggleTemplateProps {
  viewModel: ISlideToggleReactVM;
  updateValue: () => void;
}

function DxSlideToggleTemplate({viewModel, updateValue}: IDxSLideToggleTemplateProps) {
  const indicatorView = viewModel.templates.indicatorView;
  const textView = viewModel.templates.textView;

  return (
    <div className={`dx-slide-toggle ${viewModel.config.textPosition === 'left' ? '-left' : '-right'}`}
         onClick={updateValue}>
      {
        indicatorView({
          value: viewModel.value,
          textPosition: viewModel.config.textPosition
        })
      }
      {
        textView({text: viewModel.config.text})
      }
    </div>
  );
}

export type {IDxSLideToggleTemplateProps};
export {DxSlideToggleTemplate};
