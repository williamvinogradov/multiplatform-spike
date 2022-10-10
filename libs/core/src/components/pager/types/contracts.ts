/* page number */
interface PageNumberContractModels {
  selectedPage: number;
}

interface PageNumberContractConfigs {
  pageCount: number;
}

interface PageNumberContractTemplates {
  pageNumberView: unknown;
  pageNumberItemView: unknown;
  pageNumberFakeItemView: unknown;
}

interface PageNumberContracts
  extends PageNumberContractModels, PageNumberContractConfigs, PageNumberContractTemplates {
}

/* page size */
interface PageSizeContractModels {
  selectedPageSize: number;
}

interface PageSizeContractConfigs {
  pageSizes: number[];
}

interface PageSizeContractTemplates {
  pageSizeView: unknown;
  pageSizeItemView: unknown;
}

interface PageSizeContracts
  extends PageSizeContractModels, PageSizeContractConfigs, PageSizeContractTemplates {
}

/* general */
interface PagerContractModels extends PageNumberContractModels, PageSizeContractModels {
}

interface PagerContractConfigs extends PageNumberContractConfigs, PageSizeContractConfigs {
}

interface PagerContractTemplates extends PageNumberContractTemplates, PageSizeContractTemplates {
  pagerView: unknown;
}

interface PagerContracts
  extends PagerContractModels, PagerContractConfigs, PagerContractTemplates {
}

export {
  PageNumberContractModels,
  PageNumberContracts,
  PageSizeContractModels,
  PageSizeContracts,
  PagerContracts,
  PagerContractModels,
  PagerContractConfigs,
  PagerContractTemplates,
}
