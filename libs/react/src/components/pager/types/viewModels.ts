import {IPagerItem, IPagerPageNumberVM, IPagerPageSizeVM} from '@dx/core/components/pager';
import {
  TPageNumberItemTemplate,
  TPageNumberTemplate,
  TPageSizeItemTemplate,
  TPageSizeTemplate
} from './templates';

interface IPagerPageSizeItemReact extends IPagerItem {
  template: TPageSizeItemTemplate;
}

interface IPagerPageNumberItemReact extends IPagerItem {
  template: TPageNumberItemTemplate;
}

interface IPagerPageSizeReactVM extends IPagerPageSizeVM {
  items: IPagerPageSizeItemReact[];
  template: TPageSizeTemplate;
}

interface IPagerPageNumberReactVM extends IPagerPageNumberVM {
  items: IPagerPageNumberItemReact[];
  template: TPageNumberTemplate;
}

export type {
  IPagerPageSizeItemReact,
  IPagerPageNumberItemReact,
  IPagerPageSizeReactVM,
  IPagerPageNumberReactVM
}
