type THeaderCellTemplate = (label: string) => JSX.Element;
type TDataKeyCellTemplate<TData, TProp extends keyof TData> = (value: TData[TProp]) => JSX.Element;
type TDataGetterCellTemplate<TValue> = (value: TValue) => JSX.Element;
