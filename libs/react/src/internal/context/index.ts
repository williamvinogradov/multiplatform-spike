import {ChangeCallbacks} from '../types';

type ContextCallbacks<TModel> = Required<ChangeCallbacks<TModel>>;
type ComponentContext<TStore, TModel> = [
  store: TStore,
  callbacks: ContextCallbacks<TModel>
];

export type {
  ContextCallbacks,
  ComponentContext,
};
