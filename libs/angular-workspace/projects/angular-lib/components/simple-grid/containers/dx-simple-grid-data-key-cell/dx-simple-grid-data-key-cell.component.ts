import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {TAngularTemplateObsolete} from '@dx/angular-common';

@Component({
  selector: 'dx-simple-grid-data-key-cell',
  template: `
    <ng-container *ngIf="template && data && keyName"
                  [ngTemplateOutlet]="template"
                  [ngTemplateOutletContext]="{$implicit: data[keyName]}">
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSimpleGridDataKeyCellComponent<TData> {
  @Input() data?: TData;
  @Input() keyName?: keyof TData;
  @Input() template?: TAngularTemplateObsolete;

  @HostBinding('class.dx-simple-grid-row__cell') hostClass = true;
}
