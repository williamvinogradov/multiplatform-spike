import {IPagerItem, IPagerPageNumberVM, IPagerPageSizeVM} from '@dx/core/components/pager';
import {
  DxPagerPageNumberItemViewComponent, DxPagerPageNumberViewComponent,
  DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent
} from '../views';

interface IPagerPageSizeItemAngular extends IPagerItem {
  template: DxPagerPageSizeItemViewComponent;
}

interface IPagerPageNumberItemAngular extends IPagerItem {
  template: DxPagerPageNumberItemViewComponent;
}

interface IPagerPageSizeAngularVM extends IPagerPageSizeVM {
  items: IPagerPageSizeItemAngular[];
  template: DxPagerPageSizeViewComponent;
}

interface IPagerPageNumberAngularVM extends IPagerPageNumberVM {
  items: IPagerPageNumberItemAngular[];
  template: DxPagerPageNumberViewComponent;
}

export type {
  IPagerPageSizeItemAngular,
  IPagerPageNumberItemAngular,
  IPagerPageSizeAngularVM,
  IPagerPageNumberAngularVM,
}
