export type NormalizeFunc<TState> = (state: TState) => TState;

export const createNormalizeChain = <TState>(
  normalizeFuncArray: NormalizeFunc<TState>[],
): NormalizeFunc<TState> => (state: TState) => normalizeFuncArray.reduce(
    (result, validator) => validator(result), state,
  );
