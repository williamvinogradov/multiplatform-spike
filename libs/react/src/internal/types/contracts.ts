type StringKeys<T> = Extract<keyof T, string>;

export type ChangeCallbacks<T> = {
  [P in StringKeys<T> as `${P}Change`]?: (value: T[P]) => void
};
type DefaultProps<T> = {
  [P in StringKeys<T> as `default${Capitalize<P>}`]?: T[P]
};

export type ReactProps<TModel> = DefaultProps<TModel> & ChangeCallbacks<TModel>;
