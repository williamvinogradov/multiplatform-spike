import {ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnChanges, Output} from '@angular/core';
import {IPagerOutputs, IPagerState, PAGER_DEFAULT_STATE} from '@dx/core/types/pager';
import {TAngularInputs, TAngularOutputs} from '../types';

@Component({ template: '' })
export class DxPagerContracts
  implements TAngularInputs<IPagerState>,
    TAngularOutputs<IPagerOutputs> {
  @Input() selectedPage = PAGER_DEFAULT_STATE.selectedPage;
  @Input() pageCount = PAGER_DEFAULT_STATE.pageCount;
  @Input() selectedPageSize = PAGER_DEFAULT_STATE.selectedPageSize;
  @Input() pageSizes = PAGER_DEFAULT_STATE.pageSizes;

  @Output() selectedPageChange = new EventEmitter<number>();
  @Output() selectedPageSizeChange = new EventEmitter<number>();

  constructor() {}

  updateInputs(props: Partial<IPagerState>): void {
  }
}
