/** @obsolete **/
type TReactInputs<TInputs> = Partial<TInputs>;
type TReactOutputs<TOutputs> = Partial<Record<keyof TOutputs, (value: TOutputs[keyof TOutputs]) => void>>;
type TReactTemplate<TProps> = (props: TProps) => JSX.Element;

export type {
  TReactInputs,
  TReactOutputs,
  TReactTemplate,
}
