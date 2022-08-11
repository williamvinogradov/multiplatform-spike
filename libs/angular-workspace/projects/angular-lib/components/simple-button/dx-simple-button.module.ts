import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSimpleButtonComponent } from './dx-simple-button.component';


@NgModule({
  declarations: [
    DxSimpleButtonComponent
  ],
  exports: [
    DxSimpleButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DxSimpleButtonModule { }
