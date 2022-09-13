import {EventEmitter, TemplateRef, Type} from '@angular/core';
import {PickInputs, TContractsConfig, TSelectInput} from '@dx/core/types/common';

type TAngularModel<TConfig extends TContractsConfig> = PickInputs<TConfig, TSelectInput<TConfig, 'model'>>;
type TAngularConfig<TConfig extends TContractsConfig> = PickInputs<TConfig, TSelectInput<TConfig, 'config'>>;
type TAngularTemplates<TConfig extends TContractsConfig> = PickInputs<TConfig, TSelectInput<TConfig, 'template'>>;
type TOutput<P extends string> = `${P}Change`;
type TTemplate<P extends string> = `${P}Template`;
type WithOutputEventEmitter<T> = { [P in keyof T & string as TOutput<P>]: EventEmitter<T[P]> };
// angular has bad typed templates, so we need any here.
type TAngularTemplate<TComponent> = TemplateRef<any> | Type<TComponent>;
type WithTemplate<T> = { [P in keyof T & string as TTemplate<P>]: TAngularTemplate<unknown> };

type TAngularContracts<TConfig extends TContractsConfig> =
  TAngularModel<TConfig>
  & WithOutputEventEmitter<TAngularModel<TConfig>>
  & TAngularConfig<TConfig>
  & WithTemplate<TAngularTemplates<TConfig>>

// template types.
interface IAngularViewModelData<TViewModel> {
  viewModel: TViewModel;
}

interface IAngularViewActionsData<TActions> {
  actions: TActions;
}

interface IAngularViewData<TViewModel, TActions>
  extends IAngularViewModelData<TViewModel>,
    IAngularViewActionsData<TActions> {
}

// common types.
type TNullable<T> = T | null;


export type {
  TAngularContracts,
  TAngularTemplate,
  TNullable,
  IAngularViewModelData,
  IAngularViewActionsData,
  IAngularViewData
};
