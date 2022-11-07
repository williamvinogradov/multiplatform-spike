import { createState } from '../state';

describe('Core: Component: state', () => {
  it('Returns state value', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const state = createState(initialValue);

    const result = state.getValue();

    expect(result).toEqual(initialValue);
  });

  it('Updates the state value', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const expectedValue = { model: { value: 'updated' }, dictionary: { value: 'test' } };
    const state = createState(initialValue);

    state.addUpdate({ model: expectedValue.model });
    state.commitUpdate();
    const result = state.getValue();

    expect(result).toEqual(expectedValue);
  });

  it('Doesn\'t update the state value without committing update', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const state = createState(initialValue);

    state.addUpdate({ model: { value: 'updated' } });
    const result = state.getValue();

    expect(result).toEqual(initialValue);
  });

  it('Doesn\'t update the state value if update was rolled back', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const expectedValue = { model: { value: 'updated' }, dictionary: { value: 'test' } };
    const state = createState(initialValue);

    state.addUpdate({ model: expectedValue.model });
    state.commitUpdate(true);
    const result = state.getValue();

    expect(result).toEqual(initialValue);
  });

  it('Updates state value only for committed update changes', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const expectedValue = { model: { value: 'test' }, dictionary: { value: 'updated' } };
    const state = createState(initialValue);

    state.addUpdate({ model: { value: 'updated' } });
    state.commitUpdate(true);
    state.addUpdate({ dictionary: { value: 'updated' } });
    state.commitUpdate();
    const result = state.getValue();

    expect(result).toEqual(expectedValue);
  });
});
