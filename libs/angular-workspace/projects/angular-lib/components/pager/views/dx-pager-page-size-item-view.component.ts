import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewContracts} from '@dx/angular-common';
import {IPagerPageSizeItemAngular} from '../types';

interface IDxPagerPageSizeItemActions {
  selectPageSize: (pageSize: number) => void;
}

@Component({
  template: '',
})
export abstract class DxPagerPageSizeItemViewContracts
  extends DxViewContracts<IPagerPageSizeItemAngular, IDxPagerPageSizeItemActions> {
}

@Component({
  selector: 'dx-pager-page-size-item-view',
  template: `
    <div class="dx-pager-page-size__item"
         [class.-selected]="viewModel.selected"
         (click)="actions.selectPageSize(viewModel.value)">
      {{ viewModel.label }}
    </div>
  `,
  styleUrls: ['./dx-pager-page-size-item-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxPagerPageSizeItemViewComponent extends DxPagerPageSizeItemViewContracts {
}
