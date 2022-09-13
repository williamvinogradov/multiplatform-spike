import {TConfigInput, TModelInput, TTemplateInput} from '../common';

// These obsolete types will be deleted after simple grid rework.
/** @obsolete **/
interface IPagerPageSizeState {
  selectedPageSize: number;
  pageSizes: number[];
}

/** @obsolete **/
interface IPagerPageNumberState {
  selectedPage: number;
  pageCount: number;
}

/** @obsolete **/
interface IPagerState extends IPagerPageSizeState, IPagerPageNumberState {}

/** @obsolete **/
interface IPagerOutputs {
  selectedPageChange: number;
  selectedPageSizeChange: number;
}

/** @obsolete **/
export type {
  IPagerPageSizeState,
  IPagerPageNumberState,
  IPagerState,
  IPagerOutputs,
};

// Actual code.

type TPagerContractsConfig = {
  selectedPage: TModelInput<number>;
  selectedPageSize: TModelInput<number>;
  pageCount: TConfigInput<number>;
  pageSizes: TConfigInput<number[]>;
  pager: TTemplateInput;
  pageNumber: TTemplateInput;
  pageNumberItem: TTemplateInput;
  pageNumberFakeItem: TTemplateInput;
  pageSize: TTemplateInput;
  pageSizeItem: TTemplateInput;
}

export type {
  TPagerContractsConfig
};
