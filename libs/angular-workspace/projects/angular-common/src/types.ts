/* inputs & outputs */
import {EventEmitter, TemplateRef} from '@angular/core';

type TAngularInputs<TInputs> = Partial<TInputs>;
type TAngularOutputs<TOutputs> = Record<keyof TOutputs, EventEmitter<TOutputs[keyof TOutputs]>>

/* reactive forms */
type TOnChangeCallback<TControlValue> = (value: TControlValue) => void;
type TOnTouchCallback = () => void;

/* templates */
type TTemplate = TemplateRef<unknown>;

export type {
  TAngularInputs,
  TAngularOutputs,
  TOnChangeCallback,
  TOnTouchCallback,
  TTemplate,
}
