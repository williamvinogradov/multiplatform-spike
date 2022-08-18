import {Component, Input, OnChanges} from '@angular/core';
import {TAngularInputs} from '@dx/angular-common';
import {DxSimpleGridLogic, SimpleGridState} from '@dx/core/components/simpleGrid';
import {getDefaultSimpleGridInputs, ISimpleGridInputs} from '@dx/core/types/simpleGrid';

@Component({
  selector: 'dx-simple-grid',
  template: `
    <dx-simple-grid-table-container></dx-simple-grid-table-container>
    <ng-content></ng-content>
  `,
  styles: [':host { display: block }'],
  providers: [
    { provide: SimpleGridState, useClass: SimpleGridState },
    {
      provide: DxSimpleGridLogic,
      useFactory: (state: SimpleGridState<unknown>) => new DxSimpleGridLogic(state),
      deps: [SimpleGridState],
    },
  ]
})
export class DxSimpleGridComponent<TData>
  implements
    TAngularInputs<ISimpleGridInputs<TData>>,
    OnChanges {

  @Input() data = getDefaultSimpleGridInputs<TData>().data;
  @Input() columns = getDefaultSimpleGridInputs<TData>().columns;

  constructor(private logic: DxSimpleGridLogic<TData>) { }

  ngOnChanges(): void {
    this.logic.updateStateFromPropsAction({
      data: this.data,
      columns: this.columns,
    });
  }
}
