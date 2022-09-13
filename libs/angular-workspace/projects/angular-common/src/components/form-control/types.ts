// reactive form types.
type TOnChangeCallback<TControlValue> = (value: TControlValue) => void;
type TOnTouchCallback = () => void;

export type {
  TOnChangeCallback,
  TOnTouchCallback,
}
