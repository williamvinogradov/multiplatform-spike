enum ESimpleGridColumnTypes {
  key = 'key',
  getter = 'getter'
}

// (label: string) => TFrameworkTemplate
// (value: TData[keyof TData]) => TFrameworkTemplate
// (value: TValue) => TFrameworkTemplate

interface ISimpleGridColumnBase {
  type: ESimpleGridColumnTypes;
  label: string;
  headerTemplate: unknown;
}

interface ISimpleGridColumnKey<TData> extends ISimpleGridColumnBase {
  type: ESimpleGridColumnTypes.key;
  keyName: keyof TData;
  dataTemplate: unknown;
}

interface ISimpleGridColumnGetter<TData, TValue> extends ISimpleGridColumnBase {
  type: ESimpleGridColumnTypes.getter;
  valueGetter: (rowData: TData) => TValue;
  dataTemplate: unknown
}

export type {
  ISimpleGridColumnBase,
  ISimpleGridColumnKey,
  ISimpleGridColumnGetter,
}

export {
  ESimpleGridColumnTypes,
}
