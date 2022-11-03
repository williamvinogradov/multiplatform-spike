import {PageNumberVM, ItemVM, PageSizeVM, RootTemplateVM} from '@dx/core/components/pager';
import {
  PageNumberItemTemplate,
  PageNumberTemplate,
  PagerTemplate,
  PageSizeItemTemplate,
  PageSizeTemplate
} from './templates';

interface RootTemplateReactVM extends RootTemplateVM {
  template: PagerTemplate;
}

interface ItemReactVM<Template> extends ItemVM {
  template: Template;
}

interface PageNumberReactVM extends PageNumberVM {
  items: ItemReactVM<PageNumberItemTemplate>[];
  template: PageNumberTemplate;
}

interface PageSizeReactVM extends PageSizeVM {
  items: ItemReactVM<PageSizeItemTemplate>[];
  template: PageSizeTemplate;
}

export type {
  RootTemplateReactVM,
  ItemReactVM,
  PageNumberReactVM,
  PageSizeReactVM,
}
