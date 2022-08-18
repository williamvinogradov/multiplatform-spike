import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ISimpleGridTableRowsVMDataBaseCell} from '@dx/core/components/simpleGrid';
import {ESimpleGridColumnTypes} from '@dx/core/types/simpleGrid';
import {castUnknownToTemplate} from '@dx/angular-common';
import {asDataGetter, asDataKey} from '../../utils/dataCellTypeCast';

@Component({
  selector: 'dx-simple-grid-row-container',
  templateUrl: './dx-simple-grid-row-container.component.html',
  styleUrls: ['./dx-simple-grid-row-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSimpleGridRowContainerComponent<TData> implements OnInit {
  @Input() data?: TData
  @Input() cellData: ISimpleGridTableRowsVMDataBaseCell[] = [];
  @Input() rowRecordId: string = '';

  types = {
    cellType: ESimpleGridColumnTypes,
  };

  utils = {
    asDataGetter: asDataGetter,
    asDataKey: asDataKey,
    castToTemplate: castUnknownToTemplate,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
