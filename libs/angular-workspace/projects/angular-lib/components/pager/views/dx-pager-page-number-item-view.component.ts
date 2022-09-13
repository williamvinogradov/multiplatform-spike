import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewContracts} from '@dx/angular-common';
import {IPagerPageNumberItemAngular} from '../types';

interface IDxPagerPageNumberItemActions {
  selectPage: (pageNumber: number) => void;
}

@Component({template: ''})
export abstract class DxPagerPageNumberItemViewContracts
  extends DxViewContracts<IPagerPageNumberItemAngular, IDxPagerPageNumberItemActions> {
}

@Component({
  selector: 'dx-pager-page-number-item-view',
  template: `
    <div class="dx-pager-pages__item"
         [class.-selected]="viewModel.selected"
         [class.-selectable]="viewModel.selectable"
         (click)="actions.selectPage(viewModel.value)">
      {{ viewModel.label }}
    </div>
  `,
  styleUrls: ['./dx-pager-page-number-item-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxPagerPageNumberItemViewComponent extends DxPagerPageNumberItemViewContracts {
}

