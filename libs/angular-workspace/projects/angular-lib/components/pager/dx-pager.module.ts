import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxPagerComponent} from './dx-pager.component';


@NgModule({
  declarations: [
    DxPagerComponent
  ],
  exports: [
    DxPagerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class DxPagerModule {
}
