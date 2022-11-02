import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
  ModelOptions,
  ConfigOptions,
  TemplateOptions,
  TTextPosition
} from '@dx/core/components/slideToggle';
import {FormControlComponent, AngularContracts, AngularTemplate} from '@dx/angular-common';
import {
  DxSlideToggleIndicatorViewBase,
  DxSlideToggleTextViewBase
} from '../views';


@Component({template: ''})
export abstract class DxSlideToggleInputs
  // TODO: Think about composition instead of inheritance here (ts mixins)
  extends FormControlComponent<boolean>
  implements AngularContracts<ModelOptions, ConfigOptions, TemplateOptions> {
  // inputs.
  @Input() value?: boolean;
  @Input() text?: string
  @Input() textPosition?: TTextPosition;
  // customization section.
  @Input() indicatorView?: AngularTemplate<DxSlideToggleIndicatorViewBase>;
  @Input() textView?: AngularTemplate<DxSlideToggleTextViewBase>;
  // outputs.
  @Output() valueChange = new EventEmitter<boolean>;

  protected constructor(ngControl: NgControl) {
    super(ngControl);
  }
}
