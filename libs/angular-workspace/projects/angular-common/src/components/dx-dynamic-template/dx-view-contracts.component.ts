import {Component, Input} from '@angular/core';
import {IAngularViewActionsData, IAngularViewData, IAngularViewModelData} from '../../types2';
import {DxViewComponent} from './dx-view.component';


@Component({ template: '' })
export abstract class DxViewModelContracts<TViewModel>
  extends DxViewComponent
  implements IAngularViewModelData<TViewModel> {
  @Input() viewModel!: TViewModel;
}

@Component({ template: ''})
export abstract class DxViewActionsContracts<TViewActions>
  extends DxViewComponent
  implements IAngularViewActionsData<TViewActions> {
  @Input() actions!: TViewActions;
}

@Component({ template: ''})
export abstract class DxViewContracts<TViewModel, TViewActions>
  extends DxViewComponent
  implements IAngularViewData<TViewModel, TViewActions> {
  @Input() viewModel!: TViewModel;
  @Input() actions!: TViewActions;
}
