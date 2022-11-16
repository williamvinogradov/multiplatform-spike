type Extension<TSymbol extends symbol, TValue> = {
  [K in TSymbol]: TValue
};

type Split<
  TExtended extends Extension<TSymbol, unknown>,
  TSymbol extends symbol,
> = TExtended extends Extended<infer T, TSymbol, TExtended[TSymbol]>
  ? [T, TExtended[TSymbol]]
  : never;

export type Extended<T, TSymbol extends symbol, TValue> = T & Extension<TSymbol, TValue>;

export function detach<TExtended extends Extension<TSymbol, unknown>, TSymbol extends symbol>(
  value: TExtended,
  symbol: TSymbol,
): Split<TExtended, TSymbol> {
  const { [symbol]: extensionValue, ...rest } = value;
  return [rest, extensionValue] as Split<TExtended, TSymbol>;
}
