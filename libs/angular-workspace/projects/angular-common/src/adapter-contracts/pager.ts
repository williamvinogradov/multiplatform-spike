// This code will be deleted after simpleGrid rework.

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPagerOutputs, IPagerState} from '@dx/core/types/pager';

import {TAngularInputs, TAngularOutputs} from '../types';

@Component({ template: '' })
/** @obsolete **/
export abstract class DxPagerContracts
  implements TAngularInputs<IPagerState>,
    TAngularOutputs<IPagerOutputs> {
  @Input() selectedPage = 1;
  @Input() pageCount = 1;
  @Input() selectedPageSize = 20;
  @Input() pageSizes = [20,40];

  @Output() selectedPageChange = new EventEmitter<number>();
  @Output() selectedPageSizeChange = new EventEmitter<number>();

  updateInputs(props: Partial<IPagerState>): void {
  }
}
