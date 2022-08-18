import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DxSlideToggleModule} from '@dx/angular/components/slide-toggle';
import {DxSimpleButtonModule} from '@dx/angular/components/simple-button';
import {DxPagerModule} from '@dx/angular/components/pager';
import {DxSimpleGridModule} from '@dx/angular/components/simple-grid';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing-module';
import {SlideToggleExampleComponent} from './examples/slide-toggle-example/slide-toggle-example.component';
import {PagerExampleComponent} from './examples/pager-example/pager-example.component';
import {HomeComponent} from './home/home.component';
import {SimpleButtonExampleComponent} from './examples/simple-button-example/simple-button-example.component';
import {SimpleGridExampleComponent} from './examples/simple-grid-example/simple-grid-example.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideToggleExampleComponent,
    PagerExampleComponent,
    HomeComponent,
    SimpleButtonExampleComponent,
    SimpleGridExampleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DxSlideToggleModule,
    DxSimpleButtonModule,
    DxPagerModule,
    DxSimpleGridModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
