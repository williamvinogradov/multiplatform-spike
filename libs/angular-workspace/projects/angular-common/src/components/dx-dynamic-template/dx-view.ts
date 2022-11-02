import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {AngularViewActionsData, AngularViewData, AngularViewModelData} from '../../types';


@Component({ template: '' })
export abstract class DxView {
  constructor(protected cdRef: ChangeDetectorRef) {
  }

  markForCheck(): void {
    this.cdRef.markForCheck();
  }
}

@Component({ template: '' })
export abstract class DxViewModelBase<TViewModel>
  extends DxView
  implements AngularViewModelData<TViewModel> {
  @Input() viewModel!: TViewModel;
}

@Component({ template: ''})
export abstract class DxViewActionsBase<TViewActions>
  extends DxView
  implements AngularViewActionsData<TViewActions> {
  @Input() actions!: TViewActions;
}

@Component({ template: ''})
export abstract class DxViewBase<TViewModel, TViewActions>
  extends DxView
  implements AngularViewData<TViewModel, TViewActions> {
  @Input() viewModel!: TViewModel;
  @Input() actions!: TViewActions;
}
