type ValidationFunc<TState> = (state: TState) => TState;


const buildValidationChain = <TState>(
  validationFuncArray: ValidationFunc<TState>[]
): ValidationFunc<TState> =>
  (state: TState) =>
    validationFuncArray.reduce(
      (result, validator) =>
        validator(result), state);

export type {ValidationFunc};
export {buildValidationChain};
