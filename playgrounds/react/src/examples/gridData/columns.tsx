import {ColumnConfigurator} from "@dx/react/components/simpleGrid";
import {IMyGridData} from "./data";

const columnsConfigurator = new ColumnConfigurator<IMyGridData>();
export const MY_COLUMNS = [
  columnsConfigurator.createDataKeyColumn({
    label: 'id',
    keyName: 'id',
    headerTemplate: (label: string) => <div>{label}</div>,
    dataTemplate: (data: number) => <div>{data}</div>
  }),
  columnsConfigurator.createDataKeyColumn({
    label: 'name',
    keyName: 'name',
    headerTemplate: (label: string) => <div>{label}</div>,
    dataTemplate: (data: string) => <div>{data}</div>
  }),
  columnsConfigurator.createDataKeyColumn({
    label: 'surname',
    keyName: 'surname',
    headerTemplate: (label: string) => <div>{label}</div>,
    dataTemplate: (data: string) => <div>{data}</div>
  }),
  columnsConfigurator.createDataGetterColumn({
    label: 'full name',
    valueGetter: (data) => `${data.name} ${data.surname}`,
    headerTemplate: (label: string) => <div>{label}</div>,
    dataTemplate: (data: string) => <div>{data}</div>
  })
]
