import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewContracts} from '@dx/angular-common';
import {IPagerPageSizeAngularVM} from '../types';

interface IDxPagerPageSizeActions {
  selectPageSize: (pageSize: number) => void;
}

@Component({
  template: '',
})
export abstract class DxPagerPageSizeViewContracts
  extends DxViewContracts<IPagerPageSizeAngularVM, IDxPagerPageSizeActions> {
}

@Component({
  selector: 'dx-pager-page-size-view',
  template: `
    <div class="dx-pager-page-size">
      <dx-dynamic-template *ngFor="let item of viewModel.items"
                           [template]="item.template"
                           [data]="{
                           viewModel: item,
                           actions: { selectPageSize: actions.selectPageSize }
                           }">
      </dx-dynamic-template>
    </div>
  `,
  styleUrls: ['./dx-pager-page-size-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxPagerPageSizeViewComponent extends DxPagerPageSizeViewContracts {
}
