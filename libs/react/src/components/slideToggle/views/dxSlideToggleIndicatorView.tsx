import React from "react";
import {ISlideToggleIndicatorVM} from "dx-core";

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
    <div className={'dx-slide-toggle-indicator ' + viewModel.textPosition === 'left' ? '-right' : '-left'}>
      {viewModel.value.toString()}
    </div>
  )
}

DxSlideToggleIndicatorView.defaultProps = DEFAULT_DX_SLIDE_TOGGLE_INDICATOR_PROPS;

export {DxSlideToggleIndicatorView}