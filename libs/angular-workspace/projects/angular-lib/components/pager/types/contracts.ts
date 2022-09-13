import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PAGER_DEFAULT_STATE} from '@dx/core/components/pager'
import {TPagerContractsConfig} from '@dx/core/types/pager';
import {TAngularContracts, TAngularTemplate} from '@dx/angular-common';
import {
  DxPagerPageNumberItemViewComponent,
  DxPagerPageNumberViewComponent, DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent, DxPagerViewComponent,
  DxPagerViewContracts
} from '../views';

@Component({ template: '' })
export abstract class DxPagerContracts implements TAngularContracts<TPagerContractsConfig>{
  // inputs.
  @Input() selectedPage = PAGER_DEFAULT_STATE.pageNumber.selected;
  @Input() selectedPageSize = PAGER_DEFAULT_STATE.pageSize.selected;
  @Input() pageCount = PAGER_DEFAULT_STATE.pageNumber.count;
  @Input() pageSizes = PAGER_DEFAULT_STATE.pageSize.sizes;
  // customization.
  @Input() pagerTemplate: TAngularTemplate<DxPagerViewContracts> = DxPagerViewComponent;
  @Input() pageNumberTemplate: TAngularTemplate<DxPagerPageNumberViewComponent> = DxPagerPageNumberViewComponent;
  @Input() pageNumberItemTemplate: TAngularTemplate<DxPagerPageNumberItemViewComponent> = DxPagerPageNumberItemViewComponent;
  @Input() pageNumberFakeItemTemplate: TAngularTemplate<DxPagerPageNumberItemViewComponent> = DxPagerPageNumberItemViewComponent;
  @Input() pageSizeTemplate: TAngularTemplate<DxPagerPageSizeViewComponent> = DxPagerPageSizeViewComponent;
  @Input() pageSizeItemTemplate: TAngularTemplate<DxPagerPageSizeItemViewComponent> = DxPagerPageSizeItemViewComponent;
  // outputs.
  @Output() selectedPageChange = new EventEmitter<number>();
  @Output() selectedPageSizeChange = new EventEmitter<number>();
}
