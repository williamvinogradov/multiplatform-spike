import fn = jest.fn;
import { createNormalizeChain } from '../normalize';

describe('Core: Component: normalize', () => {
  it('Calls all passed normalize functions', () => {
    const spyNormalizeArray = [fn(), fn(), fn()];

    const normalize = createNormalizeChain(spyNormalizeArray);
    normalize({ });

    spyNormalizeArray.forEach((spy) => expect(spy).toHaveBeenCalledTimes(1));
  });

  it('Calls passed normalize functions in correct order', () => {
    const callOrder: number[] = [];
    const spyNormalizeArray = [
      fn().mockImplementation(() => callOrder.push(0)),
      fn().mockImplementation(() => callOrder.push(1)),
      fn().mockImplementation(() => callOrder.push(2)),
    ];

    const normalize = createNormalizeChain(spyNormalizeArray);
    normalize({ });

    expect(callOrder).toEqual([0, 1, 2]);
  });

  it('Passes the results of a normalize function to the next function in the chain', () => {
    const normalizeFunc = (value: number) => value + 1;
    const spyNormalizeArray = [
      fn().mockImplementation(normalizeFunc),
      fn().mockImplementation(normalizeFunc),
      fn().mockImplementation(normalizeFunc),
    ];

    const normalize = createNormalizeChain(spyNormalizeArray);
    normalize(0);

    spyNormalizeArray.forEach((spy, idx) => expect(spy).toHaveBeenCalledWith(idx));
  });
});
