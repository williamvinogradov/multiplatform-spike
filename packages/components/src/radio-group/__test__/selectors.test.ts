import { createRadioButtonVMSelector } from '../selectors';

describe('RadioGroup', () => {
  describe('Selectors', () => {
    describe('createRadioButtonVMSelector', () => {
      it('returns selector that returns selected = true if value equals', () => {
        const state = { value: {} };

        const selector = createRadioButtonVMSelector(state.value);
        const { selected } = selector(state);

        expect(selected).toBeTruthy();
      });

      it('returns selector that returns selected = false if value not equals', () => {
        const state = { value: {} };

        const selector = createRadioButtonVMSelector({});
        const { selected } = selector(state);

        expect(selected).toBeFalsy();
      });
    });
  });
});
