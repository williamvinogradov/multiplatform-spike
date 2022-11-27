import { createRadioButtonSelector } from '../selectors';

describe('RadioGroup', () => {
  describe('Selectors', () => {
    describe('createRadioButtonSelector', () => {
      it('returns selector that returns selected = true if value equals', () => {
        const state = { value: {} };

        const selector = createRadioButtonSelector(state.value);
        const { selected } = selector(state);

        expect(selected).toBeTruthy();
      });

      it('returns selector that returns selected = false if value not equals', () => {
        const state = { value: {} };

        const selector = createRadioButtonSelector({});
        const { selected } = selector(state);

        expect(selected).toBeFalsy();
      });
    });
  });
});
