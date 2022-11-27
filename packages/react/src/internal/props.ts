type OutputProp<P extends string> = `${P}Change`;
type DefaultProp<P extends string> = `default${Capitalize<P>}`;

type WithOutputProps<T> = { [P in keyof T & string as OutputProp<P>]?: (value: T[P]) => void };
type WithDefaultProps<T> = { [P in keyof T & string as DefaultProp<P>]?: T[P] };

export type Callbacks<T> = WithOutputProps<T>;
export type Props<
  TValues,
  TReadonly,
  TTemplate,
  > =
  Partial<TValues>
  & WithDefaultProps<TValues>
  & Callbacks<TValues>
  & Partial<TReadonly>
  & Partial<TTemplate>;
