import {Injectable} from '@angular/core';
import {
  ESimpleGridColumnTypes,
  ISimpleGridColumnBase,
  ISimpleGridColumnGetter,
  ISimpleGridColumnKey
} from '@dx/core/types/simpleGrid';
import {TAngularTemplateObsolete} from '@dx/angular-common';

@Injectable()
class DxColumnConfigurator<TData> {
  createDataKeyColumn<TProp extends keyof TData>(
    options: {
      label: string,
      keyName: TProp,
      headerTemplate: TAngularTemplateObsolete,
      dataTemplate: TAngularTemplateObsolete,
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
      headerTemplate: TAngularTemplateObsolete,
      dataTemplate: TAngularTemplateObsolete,
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
