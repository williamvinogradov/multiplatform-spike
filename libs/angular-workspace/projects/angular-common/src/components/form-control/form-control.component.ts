import {ControlValueAccessor, NgControl} from '@angular/forms';
import {TOnChangeCallback, TOnTouchCallback} from './types';

abstract class FormControlComponent<TValue> implements ControlValueAccessor {
  /* angular reactive form fields */
  protected onChangeCallback?: TOnChangeCallback<TValue> = () => {};
  protected onTouchCallback?: TOnTouchCallback = () => {};

  protected constructor(protected ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  abstract writeValue(value: TValue): void;

  /* Support angular reactive forms methods */
  registerOnChange(onChangeCallback: TOnChangeCallback<TValue>): void {
    this.onChangeCallback = onChangeCallback;
  }

  registerOnTouched(onTouchCallback: TOnTouchCallback): void {
    this.onTouchCallback = onTouchCallback
  }

  protected updateFormValue(newValue: TValue): void {
    this.onChangeCallback && this.onChangeCallback(newValue);
    this.onTouchCallback && this.onTouchCallback();
  }
}

export {FormControlComponent};
