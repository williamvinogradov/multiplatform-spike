import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  PagerContractConfigs,
  PagerContractModels,
  PagerContractTemplates
} from '@dx/core/components/pager'
import {AngularContracts, AngularTemplate} from '@dx/angular-common';
import {
  DxPagerPageNumberItemViewComponent,
  DxPagerPageNumberViewComponent, DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent, DxPagerViewComponent,
  DxPagerViewContracts
} from '../views';

@Component({ template: '' })
export abstract class DxPagerContracts implements AngularContracts<PagerContractModels, PagerContractConfigs, PagerContractTemplates>{
  // inputs.
  @Input() selectedPage?: number;
  @Input() selectedPageSize?: number;
  @Input() pageCount?: number;
  @Input() pageSizes?: number[];
  // customization.
  @Input() pagerView: AngularTemplate<DxPagerViewContracts>;
  @Input() pageNumberView: AngularTemplate<DxPagerPageNumberViewComponent>;
  @Input() pageNumberItemView: AngularTemplate<DxPagerPageNumberItemViewComponent>;
  @Input() pageNumberFakeItemView: AngularTemplate<DxPagerPageNumberItemViewComponent>;
  @Input() pageSizeView: AngularTemplate<DxPagerPageSizeViewComponent>;
  @Input() pageSizeItemView: AngularTemplate<DxPagerPageSizeItemViewComponent>;
  // outputs.
  @Output() selectedPageChange = new EventEmitter<number>();
  @Output() selectedPageSizeChange = new EventEmitter<number>();
}
