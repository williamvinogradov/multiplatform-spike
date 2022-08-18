import {ISimpleGridColumnBase, ISimpleGridState} from '../../../types/simpleGrid';

// (label: string) => TFrameworkTemplate;

interface ISimpleGridTableVMHeaderCell {
  recordId: string;
  label: string;
  template: unknown;
}

interface ISimpleGridTableHeaderVM {
  cells: ISimpleGridTableVMHeaderCell[];
}

function getSimpleGridTableHeaderSlice<TData>(
  state: ISimpleGridState<TData>
): ISimpleGridColumnBase[] {
  return state.columns;
}

function getSimpleGridTableHeaderVM(
  slice: ISimpleGridColumnBase[]
): ISimpleGridTableHeaderVM {
  return {
    cells: slice.map((column) => ({
      recordId: `${column.label}-label`,
      label: column.label,
      template: column.headerTemplate,
    }))
  }
}

export {
  ISimpleGridTableVMHeaderCell,
  ISimpleGridTableHeaderVM,
  getSimpleGridTableHeaderSlice,
  getSimpleGridTableHeaderVM,
}
