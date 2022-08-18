import {TTextPosition} from '@dx/core/types/slideToggle';
import React from 'react';

import './dxSlideToggleIndicatorView.scss';

interface IDxSLideToggleIndicatorViewProps {
  value: boolean;
  textPosition: TTextPosition;
}

function DxSlideToggleIndicatorView({value, textPosition}: IDxSLideToggleIndicatorViewProps) {
  return (
    <div className={`dx-slide-toggle-indicator ${textPosition === 'right' ? '-left' : '-right'}`}>
      <div className={`dx-slide-toggle-line ${!value ? '-off' : '-on'}`}>
        <div className={`dx-slide-toggle-thumb ${!value ? '-off' : '-on'}`}>
        </div>
      </div>
    </div>
  )
}

export type {
  IDxSLideToggleIndicatorViewProps,
}

export {
  DxSlideToggleIndicatorView,
}
