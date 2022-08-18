import {ISimpleGridColumnBase} from "./columns";

interface ISimpleGridInputs<TData> {
  data: TData[];
  columns: ISimpleGridColumnBase[];
}

interface ISimpleGridOutputs<TData> {
  dataChange: TData[];
}

function getDefaultSimpleGridInputs<TData>(): ISimpleGridInputs<TData> {
  return {
    data: [],
    columns: [],
  }
}

export type {
  ISimpleGridInputs,
  ISimpleGridOutputs,
}

export {
  getDefaultSimpleGridInputs,
}
