import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DxSimpleGridPagerAdapterDirective} from './adapters/dx-simple-grid-pager-adapter.directive';
import { DxSimpleGridComponent } from './dx-simple-grid.component';
import { DxSimpleGridTableContainerComponent } from './containers/dx-simple-grid-table-container/dx-simple-grid-table-container.component';
import { DxSimpleGridRowContainerComponent } from './containers/dx-simple-grid-row-container/dx-simple-grid-row-container.component';
import { DxSimpleGridDataGetterCellComponent } from './containers/dx-simple-grid-data-getter-cell/dx-simple-grid-data-getter-cell.component';
import { DxSimpleGridDataKeyCellComponent } from './containers/dx-simple-grid-data-key-cell/dx-simple-grid-data-key-cell.component';
import { DxSimpleGridHeaderCellComponent } from './containers/dx-simple-grid-header-cell/dx-simple-grid-header-cell.component';


@NgModule({
  declarations: [
    DxSimpleGridComponent,
    DxSimpleGridTableContainerComponent,
    DxSimpleGridRowContainerComponent,
    DxSimpleGridDataGetterCellComponent,
    DxSimpleGridDataKeyCellComponent,
    DxSimpleGridHeaderCellComponent,
    // adapters
    DxSimpleGridPagerAdapterDirective,
  ],
  exports: [
    DxSimpleGridComponent,
    DxSimpleGridPagerAdapterDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DxSimpleGridModule { }
