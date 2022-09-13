import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DxPagerModule} from '@dx/angular/components/pager';
import {DxSimpleGridModule} from '@dx/angular/components/simple-grid';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing-module';
import {PagerExampleModule} from './examples/pager-example';
import {SlideToggleExampleModule} from './examples/slide-toggle-example';
import {HomeComponent} from './home.component';
import {SimpleGridExampleComponent} from './examples/simple-grid-example/simple-grid-example.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimpleGridExampleComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    DxPagerModule,
    DxSimpleGridModule,
    RouterModule,
    AppRoutingModule,
    SlideToggleExampleModule,
    PagerExampleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
