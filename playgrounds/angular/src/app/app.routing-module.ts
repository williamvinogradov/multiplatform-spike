import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagerExampleComponent} from './examples/pager-example';
import {SlideToggleExampleComponent} from './examples/slide-toggle-example';
import {SimpleGridExampleComponent} from './examples/simple-grid-example/simple-grid-example.component';
import {HomeComponent} from './home.component';

export enum ERoutes {
  home = 'home',
  slideToggle = 'slideToggle',
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
