import {StringKeys} from '@dx/core/common';

export type ChangeCallbacks<T> = {
  [P in StringKeys<T> as `${P}Change`]?: (value: T[P]) => void
};
type DefaultProps<T> = {
  [P in StringKeys<T> as `default${Capitalize<P>}`]?: T[P]
};

export type ReactProps<TProps, TBindables extends keyof TProps> =
  Partial<TProps> &
  DefaultProps<Pick<TProps, TBindables>> &
  ChangeCallbacks<Pick<TProps, TBindables>>;
