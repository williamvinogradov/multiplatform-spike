import React from "react";
import {ISlideToggleTextVM} from "@dx/core/components/slideToggle";

interface IDxSlideToggleTextViewProps {
  viewModel: ISlideToggleTextVM,
}

const DEFAULT_DX_SLIDE_TOGGLE_TEXT_VIEW_PROPS: IDxSlideToggleTextViewProps = {
  viewModel: {
    text: '',
  }
}

function DxSlideToggleTextView({viewModel}: {viewModel: ISlideToggleTextVM}) {
  return (
    <div>
      {viewModel.text}
    </div>
  )
}

DxSlideToggleTextView.defaultProps = DEFAULT_DX_SLIDE_TOGGLE_TEXT_VIEW_PROPS;

export {DxSlideToggleTextView};