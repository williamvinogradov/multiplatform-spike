import { createReducer } from '../reducer';
import fn = jest.fn;

describe('reducer', () => {
  it('calls event handler', () => {
    const expectedReturnValue = {};
    const actionValue = {};
    const handler = fn().mockReturnValue(expectedReturnValue);
    const reducer = createReducer({
      a: handler,
    });

    const actualReturnValue = reducer({ action: 'a', value: actionValue });

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(actionValue);
    expect(actualReturnValue).toBe(expectedReturnValue);
  });

  it('does not call other events handlers', () => {
    const handlerB = fn();
    const handlerC = fn();
    const reducer = createReducer({
      a: fn(),
      b: handlerB,
      c: handlerC,
    });

    reducer({ action: 'a', value: undefined });

    expect(handlerB).not.toBeCalled();
    expect(handlerC).not.toBeCalled();
  });

  it('can use Symbol actions', () => {
    const action = Symbol('action');
    const handler = fn();
    const value = {};
    const reducer = createReducer({
      [action]: handler,
    });

    reducer({ action, value });

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(value);
  });

  it('throws for unknown event', () => {
    const reducer = createReducer({
      a: fn(),
    } as Record<string, () => void >);

    expect(() => reducer({ action: 'b', value: {} })).toThrow();
  });

  it('throws for undefined handler', () => {
    const invalidHandlers = {
      a: undefined as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    expect(() => createReducer(invalidHandlers)).toThrow();
  });

  it('throws for undefined handler of a Symbol action', () => {
    const action = Symbol('action');
    const invalidHandlers = {
      [action]: undefined as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    expect(() => createReducer(invalidHandlers)).toThrow();
  });
});
