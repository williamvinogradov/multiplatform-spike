import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SlideToggleState} from '@dx/core/components/slideToggle';
import {DxViewModelBase} from '@dx/angular-common';


@Component({
  template: '',
})
export abstract class DxSlideToggleTextViewBase
  extends DxViewModelBase<SlideToggleState> {
}

@Component({
  selector: 'dx-slide-toggle-text-view',
  template: `<div>{{ viewModel.dictionary.text }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleTextViewComponent extends DxSlideToggleTextViewBase {
}
