import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxDynamicTemplateModule} from '@dx/angular-common';
import {DxPagerComponent} from './dx-pager.component';
import {
  DxPagerPageNumberItemViewComponent,
  DxPagerPageNumberViewComponent,
  DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent,
  DxPagerViewComponent
} from './views';



@NgModule({
  declarations: [
    DxPagerComponent,
    // views
    DxPagerViewComponent,
    DxPagerPageSizeViewComponent,
    DxPagerPageSizeItemViewComponent,
    DxPagerPageNumberViewComponent,
    DxPagerPageNumberItemViewComponent,
  ],
  exports: [
    DxPagerComponent,
    // views
    DxPagerViewComponent,
    DxPagerPageSizeViewComponent,
    DxPagerPageSizeItemViewComponent,
    DxPagerPageNumberViewComponent,
    DxPagerPageNumberItemViewComponent,
  ],
  imports: [
    CommonModule,
    DxDynamicTemplateModule
  ]
})
export class DxPagerModule {
}
