import React from "react";

interface IDxSlideToggleTextViewProps {
  text: string;
}

function DxSlideToggleTextView({text}: IDxSlideToggleTextViewProps) {
  return (
    <div>
      {text}
    </div>
  )
}

export type {
  IDxSlideToggleTextViewProps,
}

export {
  DxSlideToggleTextView,
};
