// This code will be deleted after simpleGrid rework.

/* inputs & outputs */
import {EventEmitter, TemplateRef} from '@angular/core';

/** @obsolete **/
type TAngularInputs<TInputs> = Partial<TInputs>;
/** @obsolete **/
type TAngularOutputs<TOutputs> = Record<keyof TOutputs, EventEmitter<TOutputs[keyof TOutputs]>>

/* templates */
// unfortunately, angular templates typings still bad, so we need any here.
/** @obsolete **/
type TAngularTemplateObsolete = TemplateRef<any>;

/** @obsolete **/
export type {
  TAngularInputs,
  TAngularOutputs,
  TAngularTemplateObsolete,
}

