import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSlideToggleIndicatorViewComponent } from './views/slide-toggle-indicator-view/dx-slide-toggle-indicator-view.component';
import { DxSlideToggleTextViewComponent } from './views/slide-toggle-text-view/dx-slide-toggle-text-view.component';
import { DxSlideToggleComponent } from './dx-slide-toggle.component';
import { DxSlideToggleIndicatorContainerComponent } from './containers/dx-slide-toggle-indicator-container/dx-slide-toggle-indicator-container.component';
import { DxSlideToggleTextContainerComponent } from './containers/dx-slide-toggle-text-container/dx-slide-toggle-text-container.component';
import { DxSlideToggleContainerComponent } from './containers/dx-slide-toggle-container/dx-slide-toggle-container.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    // new
    DxSlideToggleComponent,
    DxSlideToggleIndicatorContainerComponent,
    DxSlideToggleTextContainerComponent,
    DxSlideToggleIndicatorViewComponent,
    DxSlideToggleTextViewComponent,
    DxSlideToggleContainerComponent,
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
