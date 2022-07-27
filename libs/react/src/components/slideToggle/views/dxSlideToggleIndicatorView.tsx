import React from "react";
import {ISlideToggleIndicatorVM} from "dx-core";


import "./dxSlideToggleIndicatorView.scss";

interface IDxSLideToggleIndicatorViewProps {
  viewModel: ISlideToggleIndicatorVM,
}

const DEFAULT_DX_SLIDE_TOGGLE_INDICATOR_PROPS: IDxSLideToggleIndicatorViewProps = {
  viewModel: {
    value: false,
    textPosition: 'right'
  }
}

function DxSlideToggleIndicatorView({viewModel}: {viewModel: ISlideToggleIndicatorVM}) {
  return (
    <div className={`dx-slide-toggle-indicator ${viewModel.textPosition === 'right' ? '-left' : '-right'}`}>
      <div className={`dx-slide-toggle-line ${!viewModel.value ? '-off' : '-on'}`}>
        <div className={`dx-slide-toggle-thumb ${!viewModel.value ? '-off' : '-on'}`}>
        </div>
      </div>
    </div>
  )
}

DxSlideToggleIndicatorView.defaultProps = DEFAULT_DX_SLIDE_TOGGLE_INDICATOR_PROPS;

export {DxSlideToggleIndicatorView}