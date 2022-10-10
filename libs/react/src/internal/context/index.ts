import {ReactCallbacks} from '../types';

type ContextCallbacks<TModel> = Required<ReactCallbacks<TModel>>;
type ComponentContext<TStore, TModel> = [
  store: TStore,
  callbacks: ContextCallbacks<TModel>
];

export type {
  ContextCallbacks,
  ComponentContext,
};
