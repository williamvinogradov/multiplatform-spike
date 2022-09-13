import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewModelContracts} from '@dx/angular-common';
import {ISlideToggleState} from '@dx/core/components/slideToggle';

@Component({
  template: '',
})
export abstract class DxSlideToggleTextViewContracts
  extends DxViewModelContracts<ISlideToggleState> {
}

@Component({
  selector: 'dx-slide-toggle-text-view',
  template: `<div>{{ viewModel.config.text }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleTextViewComponent extends DxSlideToggleTextViewContracts {
}
