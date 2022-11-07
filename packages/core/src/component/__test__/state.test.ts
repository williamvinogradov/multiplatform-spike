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

    state.addUpdateChunk({ model: expectedValue.model });
    state.commitUpdates();
    const result = state.getValue();

    expect(result).toEqual(expectedValue);
  });

  it('Doesn\'t update the state value without committing updates', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const state = createState(initialValue);

    state.addUpdateChunk({ model: { value: 'updated' } });
    const result = state.getValue();

    expect(result).toEqual(initialValue);
  });

  it('Doesn\'t update the state value if updates was rolled back', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const expectedValue = { model: { value: 'updated' }, dictionary: { value: 'test' } };
    const state = createState(initialValue);

    state.addUpdateChunk({ model: expectedValue.model });
    state.commitUpdates(true);
    const result = state.getValue();

    expect(result).toEqual(initialValue);
  });

  it('Updates state value only for committed updates', () => {
    const initialValue = { model: { value: 'test' }, dictionary: { value: 'test' } };
    const expectedValue = { model: { value: 'test' }, dictionary: { value: 'updated' } };
    const state = createState(initialValue);

    state.addUpdateChunk({ model: { value: 'updated' } });
    state.commitUpdates(true);
    state.addUpdateChunk({ dictionary: { value: 'updated' } });
    state.commitUpdates();
    const result = state.getValue();

    expect(result).toEqual(expectedValue);
  });
});
