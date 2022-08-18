import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DxSimpleGridLogic} from '@dx/core/components/simpleGrid';
import {castUnknownToTemplate} from '@dx/angular-common';

@Component({
  selector: 'dx-simple-grid-table-container',
  templateUrl: './dx-simple-grid-table-container.component.html',
  styleUrls: ['./dx-simple-grid-table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSimpleGridTableContainerComponent<TData> {
  headerVM$ = this.logic.headerVM$;
  rowsVM$ = this.logic.rowsVM$;

  utils = {
    castToTemplate: castUnknownToTemplate,
  }

  constructor(private logic: DxSimpleGridLogic<TData>) {
  }
}
