import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {TTemplate} from '@dx/angular-common';

@Component({
  selector: 'dx-simple-grid-header-cell',
  template: `
    <ng-container *ngIf="template"
                  [ngTemplateOutlet]="template"
                  [ngTemplateOutletContext]="{$implicit: label}">
    </ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSimpleGridHeaderCellComponent  {
  @Input() label = '';
  @Input() template?: TTemplate = undefined;

  @HostBinding('class.dx-simple-grid-table__header-cell') hostClass = true;
}
