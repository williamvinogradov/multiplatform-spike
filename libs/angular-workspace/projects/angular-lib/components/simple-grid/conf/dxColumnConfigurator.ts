import {Injectable} from '@angular/core';
import {
  ESimpleGridColumnTypes,
  ISimpleGridColumnBase,
  ISimpleGridColumnGetter,
  ISimpleGridColumnKey
} from '@dx/core/types/simpleGrid';
import {TTemplate} from '@dx/angular-common';

@Injectable()
class DxColumnConfigurator<TData> {
  createDataKeyColumn<TProp extends keyof TData>(
    options: {
      label: string,
      keyName: TProp,
      headerTemplate: TTemplate,
      dataTemplate: TTemplate,
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
      headerTemplate: TTemplate,
      dataTemplate: TTemplate,
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

export type { ISimpleGridColumnBase, ISimpleGridColumnKey, ISimpleGridColumnGetter };

export {
  DxColumnConfigurator
}
