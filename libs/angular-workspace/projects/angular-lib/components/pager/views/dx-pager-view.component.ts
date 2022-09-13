import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxViewContracts} from '@dx/angular-common';
import {IPagerPageNumberAngularVM, IPagerPageSizeAngularVM} from '../types';

export interface IDxPagerViewModel {
  pageSizeViewModel: IPagerPageSizeAngularVM;
  pageNumberViewModel: IPagerPageNumberAngularVM;
}

export interface IDxPagerViewActions {
  selectPage: (pageNumber: number) => void;
  selectPageSize: (pageSize: number) => void;
}

@Component({ template: '' })
export abstract class DxPagerViewContracts extends DxViewContracts<IDxPagerViewModel, IDxPagerViewActions>{
}

@Component({
  selector: 'dx-pager-view',
  template: `
    <div class="dx-pager">
      <dx-dynamic-template [template]="viewModel.pageSizeViewModel.template"
                           [data]="{
                             viewModel: viewModel.pageSizeViewModel,
                             actions: { selectPageSize: actions.selectPageSize }
                           }">
      </dx-dynamic-template>
      <dx-dynamic-template [template]="viewModel.pageNumberViewModel.template"
                           [data]="{
                             viewModel: viewModel.pageNumberViewModel,
                             actions: { selectPage: actions.selectPage }
                           }">
      </dx-dynamic-template>
    </div>
  `,
  styleUrls: ['./dx-pager-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxPagerViewComponent extends DxPagerViewContracts {
}
