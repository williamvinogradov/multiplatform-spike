import {
  ESimpleGridColumnTypes,
  ISimpleGridColumnGetter,
  ISimpleGridColumnKey
} from '@dx/core/types/simpleGrid';

class ColumnConfigurator<TData> {
  createDataKeyColumn<TProp extends keyof TData>(
    options: {
      label: string,
      keyName: TProp,
      headerTemplate: THeaderCellTemplate,
      dataTemplate: TDataKeyCellTemplate<TData, TProp>,
    }
  ): ISimpleGridColumnKey<TData> {
    return {
      type: ESimpleGridColumnTypes.key,
      label: options.label,
      keyName: options.keyName,
      headerTemplate: options.headerTemplate,
      dataTemplate: options.dataTemplate,
    }
  }

  createDataGetterColumn<TValue>(
    options: {
      label: string,
      valueGetter: (data: TData) => TValue,
      headerTemplate: THeaderCellTemplate,
      dataTemplate: TDataGetterCellTemplate<TValue>,
    }
  ): ISimpleGridColumnGetter<TData, TValue> {
    return {
      type: ESimpleGridColumnTypes.getter,
      label: options.label,
      valueGetter: options.valueGetter,
      headerTemplate: options.headerTemplate,
      dataTemplate: options.dataTemplate,
    }
  }
}

export {
  ColumnConfigurator
}
