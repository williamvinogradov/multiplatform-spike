import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DxSlideToggleComponent } from './dx-slide-toggle.component';


@NgModule({
  declarations: [
    DxSlideToggleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DxSlideToggleComponent,
  ]
})
export class DxSlideToggleModule { }
