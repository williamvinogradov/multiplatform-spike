interface RootTemplateVM {
  template: unknown;
}

interface ItemVM {
  label: string;
  value: number;
  selectable: boolean;
  selected: boolean;
  template: unknown;
}

interface PageNumberVM {
  items: ItemVM[];
  template: unknown;
}

interface PageSizeVM {
  items: ItemVM[];
  template: unknown;
}

interface PagerViewModels {
  rootTemplate: RootTemplateVM;
  pageNumber: PageNumberVM;
  pageSize: PageSizeVM;
}

export type {
  RootTemplateVM,
  ItemVM,
  PageNumberVM,
  PageSizeVM,
  PagerViewModels,
}
