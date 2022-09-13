import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewModelContracts} from '@dx/angular-common';
import {ISlideToggleState} from '@dx/core/components/slideToggle';

@Component({
  template: '',
})
export abstract class DxSlideToggleIndicatorViewContracts
  extends DxViewModelContracts<ISlideToggleState> {
}

@Component({
  selector: 'dx-slide-toggle-indicator-view',
  template: `
    <div class="dx-slide-toggle-indicator"
         [class.-left]="viewModel.config.textPosition === 'right'"
         [class.-right]="viewModel.config.textPosition === 'left'">
      <div class="dx-slide-toggle-line"
           [class.-off]="!viewModel.value"
           [class.-on]="viewModel.value">
        <div class="dx-slide-toggle-thumb"
             [class.-off]="!viewModel.value"
             [class.-on]="viewModel.value">
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dx-slide-toggle-indicator-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleIndicatorViewComponent extends DxSlideToggleIndicatorViewContracts {
}

