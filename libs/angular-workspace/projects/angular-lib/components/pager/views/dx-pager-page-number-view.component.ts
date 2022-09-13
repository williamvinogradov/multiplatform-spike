import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewContracts} from '@dx/angular-common';
import {IPagerPageNumberAngularVM} from '../types';

interface IDxPagerPageNumberActions {
  selectPage: (pageNumber: number) => void;
}

@Component({
  template: '',
})
export abstract class DxPagerPageNumberViewContracts
  extends DxViewContracts<IPagerPageNumberAngularVM, IDxPagerPageNumberActions> {
}

@Component({
  selector: 'dx-pager-page-number-view',
  template: `
    <div class="dx-pager-pages">
      <dx-dynamic-template *ngFor="let item of viewModel.items"
                           [template]="item.template"
                           [data]="{
                            viewModel: item,
                            actions: { selectPage: actions.selectPage }
                           }">
      </dx-dynamic-template>
    </div>
  `,
  styleUrls: ['./dx-pager-page-number-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxPagerPageNumberViewComponent extends DxPagerPageNumberViewContracts {

}
