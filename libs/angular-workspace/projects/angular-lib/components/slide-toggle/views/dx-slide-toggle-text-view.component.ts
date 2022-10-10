import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SlideToggleState} from '@dx/core/components/slideToggle';
import {DxViewModelContracts} from '@dx/angular-common';

@Component({
  template: '',
})
export abstract class DxSlideToggleTextViewContracts
  extends DxViewModelContracts<SlideToggleState> {
}

@Component({
  selector: 'dx-slide-toggle-text-view',
  template: `<div>{{ viewModel.config.text }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleTextViewComponent extends DxSlideToggleTextViewContracts {
}
