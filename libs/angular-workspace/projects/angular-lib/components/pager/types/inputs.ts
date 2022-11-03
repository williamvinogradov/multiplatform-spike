import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ModelOptions,
  ConfigOptions,
  TemplateOptions,
} from '@dx/core/components/pager'
import {AngularContracts, AngularTemplate} from '@dx/angular-common';
import {
  DxPagerPageNumberItemViewComponent,
  DxPagerPageNumberViewComponent, DxPagerPageSizeItemViewComponent,
  DxPagerPageSizeViewComponent,
  DxPagerViewBase
} from '../views';


@Component({ template: '' })
export abstract class DxPagerInputs implements AngularContracts<ModelOptions, ConfigOptions, TemplateOptions>{
  // inputs.
  @Input() selectedPage?: number;
  @Input() selectedPageSize?: number;
  @Input() pageCount?: number;
  @Input() pageSizes?: number[];
  // customization.
  @Input() pagerView: AngularTemplate<DxPagerViewBase>;
  @Input() pageNumberView: AngularTemplate<DxPagerPageNumberViewComponent>;
  @Input() pageNumberItemView: AngularTemplate<DxPagerPageNumberItemViewComponent>;
  @Input() pageNumberFakeItemView: AngularTemplate<DxPagerPageNumberItemViewComponent>;
  @Input() pageSizeView: AngularTemplate<DxPagerPageSizeViewComponent>;
  @Input() pageSizeItemView: AngularTemplate<DxPagerPageSizeItemViewComponent>;
  // outputs.
  @Output() selectedPageChange = new EventEmitter<number>();
  @Output() selectedPageSizeChange = new EventEmitter<number>();
}
