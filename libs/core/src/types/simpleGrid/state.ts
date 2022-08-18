import {getDefaultSimpleGridInputs, ISimpleGridInputs} from './contracts';
import {ISimpleGridPaging} from './paging';

interface ISimpleGridState<TData> extends ISimpleGridInputs<TData> {
  paging?: ISimpleGridPaging;
}

function getDefaultSimpleGridState<TData>(): ISimpleGridState<TData> {
  return {
    ...getDefaultSimpleGridInputs(),
  }
}

export type {
  ISimpleGridState,
}

export {
  getDefaultSimpleGridState,
}
