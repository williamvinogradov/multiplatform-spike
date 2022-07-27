import {EventEmitter} from "@angular/core";

/* inputs & outputs */
type TAngularInputs<TInputs> = Partial<TInputs>;
type TAngularOutputs<TOutputs> = Record<keyof TOutputs, EventEmitter<TOutputs[keyof TOutputs]>>

/* reactive forms */
type TOnChangeCallback<TControlValue> = (value: TControlValue) => void;
type TOnTouchCallback = () => void;

export {
  TAngularInputs,
  TAngularOutputs,
  TOnChangeCallback,
  TOnTouchCallback,
}
