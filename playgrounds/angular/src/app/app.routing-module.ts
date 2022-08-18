import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagerExampleComponent} from './examples/pager-example/pager-example.component';
import {SimpleButtonExampleComponent} from './examples/simple-button-example/simple-button-example.component';
import {SimpleGridExampleComponent} from './examples/simple-grid-example/simple-grid-example.component';
import {SlideToggleExampleComponent} from './examples/slide-toggle-example/slide-toggle-example.component';
import {HomeComponent} from './home/home.component';

export enum ERoutes {
  home = 'home',
  slideToggle = 'slideToggle',
  simpleButton = 'simpleButton',
  pager = 'pager',
  simpleGrid = 'simpleGrid',
}


const routes: Routes = [
  {
    path: ERoutes.home,
    component: HomeComponent,
  },
  {
    path: ERoutes.slideToggle,
    component: SlideToggleExampleComponent,
  },
  {
    path: ERoutes.simpleButton,
    component: SimpleButtonExampleComponent,
  },
  {
    path: ERoutes.pager,
    component: PagerExampleComponent,
  },
  {
    path: ERoutes.simpleGrid,
    component: SimpleGridExampleComponent,
  },
  {
    path: '**',
    redirectTo: ERoutes.home,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
