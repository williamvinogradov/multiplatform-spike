import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideToggleIndicatorComponent } from './views/slide-toggle-indicator/slide-toggle-indicator.component';
import { SlideToggleTextComponent } from './views/slide-toggle-text/slide-toggle-text.component';
import {DxSlideToggleComponent} from "./dx-slide-toggle.component";


@NgModule({
  declarations: [
    SlideToggleIndicatorComponent,
    SlideToggleTextComponent,
    DxSlideToggleComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DxSlideToggleComponent,
  ]
})
export class DxSlideToggleModule { }
