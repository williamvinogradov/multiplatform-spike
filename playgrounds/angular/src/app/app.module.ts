import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { DxSlideToggleModule } from '@dx/angular/components/slide-toggle';
import { DxSimpleButtonModule } from '@dx/angular/components/simple-button'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DxSlideToggleModule,
    DxSimpleButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
