import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DxColumnConfigurator} from '@dx/angular/components/simple-grid'
import {ISimpleGridColumnBase} from '@dx/core/types/simpleGrid';
import {IMyGridData, MY_GRID_DATA} from './data';

@Component({
  selector: 'app-simple-grid-example',
  templateUrl: './simple-grid-example.component.html',
  styleUrls: ['./simple-grid-example.component.scss'],
  providers: [DxColumnConfigurator],
})
export class SimpleGridExampleComponent implements OnInit {
  @ViewChild('headerTemplate', { static: true }) headerTemplate?: TemplateRef<unknown>;
  @ViewChild('dataTemplate', { static: true }) dataTemplate?: TemplateRef<unknown>;

  myData = MY_GRID_DATA;
  myColumns: ISimpleGridColumnBase[] = [];

  constructor(private columnsConfigurator: DxColumnConfigurator<IMyGridData>) {
  }

  ngOnInit(): void {
    this.myColumns = [
      this.columnsConfigurator.createDataKeyColumn({
        label: 'id',
        keyName: 'id',
        headerTemplate: this.headerTemplate!,
        dataTemplate: this.dataTemplate!,
      }),
      this.columnsConfigurator.createDataKeyColumn({
        label: 'name',
        keyName: 'name',
        headerTemplate: this.headerTemplate!,
        dataTemplate: this.dataTemplate!
      }),
      this.columnsConfigurator.createDataKeyColumn({
        label: 'surname',
        keyName: 'surname',
        headerTemplate: this.headerTemplate!,
        dataTemplate: this.dataTemplate!
      }),
      this.columnsConfigurator.createDataGetterColumn({
        label: 'full name',
        valueGetter: (data) => `${data.name} ${data.surname}`,
        headerTemplate: this.headerTemplate!,
        dataTemplate: this.dataTemplate!
      })
    ];
  }
}
