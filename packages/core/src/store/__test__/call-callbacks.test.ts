import { callbacksMiddleware } from '../../middlewares';
import { callCallbacks } from '../call-callbacks';

jest.mock('../../middlewares');

const callbacksMiddlewareMock = jest.mocked(callbacksMiddleware);

describe('Core: Store', () => {
  describe('callCallbacks', () => {
    it('calls callbacksMiddleware', () => {
      const currentState = {};
      const validatedState = {};
      const stateConfig = {};
      callbacksMiddlewareMock.mockReturnValue([]);

      callCallbacks(currentState, validatedState, { stateConfig });

      expect(callbacksMiddlewareMock).toHaveBeenCalledWith(
        currentState,
        validatedState,
        stateConfig,
      );
    });

    it('calls all callbacks from the callbacksMiddleware', () => {
      const callbacks = [jest.fn(), jest.fn(), jest.fn()];
      callbacksMiddlewareMock.mockReturnValue(callbacks);

      callCallbacks({}, {}, { stateConfig: {} });

      callbacks.forEach((callback) => expect(callback).toHaveBeenCalled());
    });
  });
});
