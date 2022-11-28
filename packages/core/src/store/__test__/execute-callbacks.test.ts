import { callbacksMiddleware } from '../../middlewares';
import { executeCallbacks } from '../execute-callbacks';

jest.mock('../../middlewares');

const callbacksMiddlewareMock = jest.mocked(callbacksMiddleware);

describe('Core: Store', () => {
  describe('executeCallbacks', () => {
    it('calls callbacksMiddleware', () => {
      const currentState = {};
      const validatedState = {};
      const stateConfig = {};
      callbacksMiddlewareMock.mockReturnValue([]);

      executeCallbacks(currentState, validatedState, { stateConfig });

      expect(callbacksMiddlewareMock).toHaveBeenCalledWith(
        currentState,
        validatedState,
        stateConfig,
      );
    });

    it('calls all callbacks from the callbacksMiddleware', () => {
      const callbacks = [jest.fn(), jest.fn(), jest.fn()];
      callbacksMiddlewareMock.mockReturnValue(callbacks);

      executeCallbacks({}, {}, { stateConfig: {} });

      callbacks.forEach((callback) => expect(callback).toHaveBeenCalled());
    });
  });
});
