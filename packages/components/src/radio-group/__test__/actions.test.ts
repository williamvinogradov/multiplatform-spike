import { createUpdateValueAction } from '../actions';

describe('RadioGroup', () => {
  describe('Actions', () => {
    describe('createUpdateValueAction', () => {
      it('returns function that returns the passed value', () => {
        const expectedValue = { a: 1 };

        const updateFunc = createUpdateValueAction(expectedValue);
        const result = updateFunc({});

        expect(result).toEqual({ value: expectedValue });
      });
    });
  });
});
