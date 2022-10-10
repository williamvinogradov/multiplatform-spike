import {ItemVM, PageNumberVM, PageSizeVM} from '@dx/core/components/pager';
import {
  DxPagerPageNumberItemViewComponent, DxPagerPageNumberViewComponent,
  DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent
} from '../views';

interface ItemAngularVM<Template> extends ItemVM {
  template: Template;
}

interface PageSizeAngularVM extends PageSizeVM {
  items: ItemAngularVM<DxPagerPageSizeItemViewComponent>[];
  template: DxPagerPageSizeViewComponent;
}

interface PageNumberAngularVM extends PageNumberVM {
  items: ItemAngularVM<DxPagerPageNumberItemViewComponent>[];
  template: DxPagerPageNumberViewComponent;
}

export type {
  ItemAngularVM,
  PageSizeAngularVM,
  PageNumberAngularVM,
}
