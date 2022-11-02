/* model */
interface ModelOptions {
  selectedPage: number;
  selectedPageSize: number;
}

/* config */
interface ConfigOptions {
  pageCount: number;
  pageSizes: number[];
}

/* templates */
interface TemplateOptions {
  // pager.
  pagerView: unknown;
  // page number.
  pageNumberView: unknown;
  pageNumberItemView: unknown;
  pageNumberFakeItemView: unknown;
  // page size.
  pageSizeView: unknown;
  pageSizeItemView: unknown;
}

interface PagerOptions
  extends ModelOptions, ConfigOptions, TemplateOptions {
}

export {
  ModelOptions,
  ConfigOptions,
  TemplateOptions,
  PagerOptions
}
