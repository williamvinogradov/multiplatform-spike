export interface StateModelPropertyConfig<T> {
  isControlled: boolean;
  publicCallback: (value: T) => void;
}

export type StateModelConfigMap<TModel> = {
  [P in keyof TModel]?: StateModelPropertyConfig<TModel[P]>
};
