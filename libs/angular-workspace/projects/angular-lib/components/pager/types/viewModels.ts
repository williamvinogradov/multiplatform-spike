import {ItemVM, PageNumberVM, PageSizeVM, RootTemplateVM} from '@dx/core/components/pager';
import {
  DxPagerPageNumberItemViewComponent, DxPagerPageNumberViewComponent,
  DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent, DxPagerViewComponent
} from '../views';


interface RootTemplateAngularVM extends RootTemplateVM {
  template: DxPagerViewComponent;
}

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
  RootTemplateAngularVM,
  ItemAngularVM,
  PageSizeAngularVM,
  PageNumberAngularVM,
}
