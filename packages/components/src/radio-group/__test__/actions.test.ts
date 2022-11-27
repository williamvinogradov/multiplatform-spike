import { updateValueAction } from '../actions';

describe('RadioGroup', () => {
  describe('Actions', () => {
    describe('updateValueAction', () => {
      it('returns function that returns the passed value', () => {
        const expectedValue = { a: 1 };

        const updateFunc = updateValueAction(expectedValue);
        const result = updateFunc({});

        expect(result).toEqual({ value: expectedValue });
      });
    });
  });
});
