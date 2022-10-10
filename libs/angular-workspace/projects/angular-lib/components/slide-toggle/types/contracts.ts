import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
  SlideToggleContractModels,
  SlideToggleContractConfigs,
  SlideToggleContractTemplates,
  TTextPosition
} from '@dx/core/components/slideToggle';
import {FormControlComponent, AngularContracts, AngularTemplate} from '@dx/angular-common';
import {
  DxSlideToggleIndicatorViewContracts,
  DxSlideToggleTextViewContracts
} from '../views';

@Component({template: ''})
export abstract class DxSlideToggleContracts
  // TODO: Think about composition instead of inheritance here (ts mixins)
  extends FormControlComponent<boolean>
  implements AngularContracts<SlideToggleContractModels, SlideToggleContractConfigs, SlideToggleContractTemplates> {
  // inputs.
  @Input() value?: boolean;
  @Input() text?: string
  @Input() textPosition?: TTextPosition;
  // customization section.
  @Input() indicatorView?: AngularTemplate<DxSlideToggleIndicatorViewContracts>;
  @Input() textView?: AngularTemplate<DxSlideToggleTextViewContracts>;
  // outputs.
  @Output() valueChange = new EventEmitter<boolean>;

  protected constructor(ngControl: NgControl) {
    super(ngControl);
  }
}
