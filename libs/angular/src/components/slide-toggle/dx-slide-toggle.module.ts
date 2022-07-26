import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideToggleIndicatorViewComponent } from './views/slide-toggle-indicator-view/slide-toggle-indicator-view.component';
import { SlideToggleTextViewComponent } from './views/slide-toggle-text-view/slide-toggle-text-view.component';
import {DxSlideToggleComponent} from "./dx-slide-toggle.component";


@NgModule({
  declarations: [
    SlideToggleIndicatorViewComponent,
    SlideToggleTextViewComponent,
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
