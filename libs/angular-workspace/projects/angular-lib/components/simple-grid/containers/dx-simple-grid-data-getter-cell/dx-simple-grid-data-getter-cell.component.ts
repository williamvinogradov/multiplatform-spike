import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges} from '@angular/core';
import {TAngularTemplateObsolete} from '@dx/angular-common';

@Component({
  selector: 'dx-simple-grid-data-getter-cell',
  template: `
    <ng-container *ngIf="template"
                  [ngTemplateOutlet]="template"
                  [ngTemplateOutletContext]="{$implicit: dataForTemplate}">
    </ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSimpleGridDataGetterCellComponent<TData> implements OnChanges {
  @Input() data?: TData;
  @Input() valueGetter?: (data: TData) => unknown;
  @Input() template?: TAngularTemplateObsolete;

  @HostBinding('class.dx-simple-grid-row__cell') hostClass = true;

  dataForTemplate: unknown;

  ngOnChanges(): void {
    if (this.valueGetter && this.data) {
      this.dataForTemplate = this.valueGetter(this.data);
    }
  }
}
