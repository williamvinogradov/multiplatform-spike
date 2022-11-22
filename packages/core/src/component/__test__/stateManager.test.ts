import { callbacksMiddleware, controlledModeMiddleware } from '../../middlewares';
import { createReducer } from '../../reducer';
import { createState } from '../../state';
import { pipe } from '../../utils';
import { createStateManager } from '../stateManager';

jest.mock('../../utils');
jest.mock('../../state');
jest.mock('../../reducer');
jest.mock('../../middlewares');

const createStateMock = jest.mocked(createState);
const stateMock = {
  addUpdate: jest.fn(),
  commitUpdates: jest.fn(),
  rollbackUpdates: jest.fn(),
  getCurrent: jest.fn().mockReturnValue({}),
  triggerRender: jest.fn(),
  subscribeForRender: jest.fn(),
};
const stateModelProp = 'propA';
const stateValueMock = { model: { [stateModelProp]: 0 }, dictionary: {} };

const createReducerMock = jest.mocked(createReducer);
const secondCreateReducerMock = jest.fn();
const reducerMock = jest.fn();

const pipeMock = jest.mocked(pipe);
const validatorMock = jest.fn();

const callbacksMiddlewareMock = jest.mocked(callbacksMiddleware);
const controlledMiddlewareMock = jest.mocked(controlledModeMiddleware);

describe('Core: Component', () => {
  beforeEach(() => {
    createStateMock.mockReturnValue(stateMock);
    createReducerMock.mockReturnValue(secondCreateReducerMock);
    secondCreateReducerMock.mockReturnValue(reducerMock);
    pipeMock.mockReturnValue(validatorMock);
    validatorMock.mockReturnValue({});
    callbacksMiddlewareMock.mockReturnValue([]);
    controlledMiddlewareMock.mockReturnValue([{}, false]);
  });

  afterAll(() => { jest.clearAllMocks(); });

  describe('StateManager', () => {
    describe('commitUpdates', () => {
      it('calls state\'s base method', () => {
        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.commitUpdates();

        expect(stateMock.commitUpdates).toHaveBeenCalledTimes(1);
      });

      it('calls validator', () => {
        const expectedToValidateState = {};
        stateMock.getCurrent.mockReturnValue(expectedToValidateState);

        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.commitUpdates();

        expect(validatorMock).toHaveBeenCalledTimes(1);
        expect(validatorMock).toHaveBeenCalledWith(expectedToValidateState);
      });

      it('calls all needed callbacks', () => {
        const neededCallbacks = [jest.fn(), jest.fn(), jest.fn()];
        callbacksMiddlewareMock.mockReturnValue(neededCallbacks);

        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.commitUpdates();

        neededCallbacks.forEach((callbackMock) => {
          expect(callbackMock).toHaveBeenCalledTimes(1);
        });
      });

      it('calls state\'s commitUpdates again and updates state\'s model'
        + ' if model has changes after middleware', () => {
        const expectedModel = {};
        controlledMiddlewareMock.mockImplementation(() => {
          stateMock.commitUpdates.mockReset();
          return [expectedModel, true];
        });

        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.commitUpdates();

        expect(stateMock.commitUpdates).toHaveBeenCalledTimes(1);
        expect(stateMock.addUpdate).toHaveBeenCalledTimes(1);
        const [[{ model }]] = stateMock.addUpdate.mock.calls;
        expect(model).toBe(expectedModel);
      });

      it('doesn\'t call state\'s commitUpdates again and doesn\'t update state\'s model'
        + ' if model hasn\'t changes after middleware', () => {
        controlledMiddlewareMock.mockImplementation(() => {
          stateMock.commitUpdates.mockReset();
          return [{}, false];
        });

        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.commitUpdates();

        expect(stateMock.commitUpdates).not.toHaveBeenCalled();
        expect(stateMock.addUpdate).not.toHaveBeenCalled();
      });

      it('always call state\'s triggerRender independent of the model changes', () => {
        const expectedStateCurrent = {};
        const possibleHasChanges = [true, false];
        stateMock.getCurrent.mockReturnValue(expectedStateCurrent);

        const [manager] = createStateManager(stateValueMock, {}, {});

        possibleHasChanges.forEach((hasChanges) => {
          controlledMiddlewareMock.mockReturnValue([{}, hasChanges]);
          manager.commitUpdates();

          expect(stateMock.triggerRender).toHaveBeenCalledTimes(1);
          expect(stateMock.triggerRender).toHaveBeenCalledWith(expectedStateCurrent);
          stateMock.triggerRender.mockReset();
        });
      });
    });

    describe('addUpdate', () => {
      it('calls state\'s base method', () => {
        const expectedUpdate = {};
        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.addUpdate(expectedUpdate);

        expect(stateMock.addUpdate).toHaveBeenCalledTimes(1);
        expect(stateMock.addUpdate).toBeCalledWith(expectedUpdate);
      });
    });

    describe('rollbackUpdates', () => {
      it('calls state\'s base method', () => {
        const [manager] = createStateManager(stateValueMock, {}, {});
        manager.rollbackUpdates();

        expect(stateMock.rollbackUpdates).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Dispatcher', () => {
    it('calls reducer', () => {
      const expectedState = {};
      const expectedValue = {};
      stateMock.getCurrent.mockReturnValue(expectedState);

      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, expectedValue);

      expect(reducerMock).toHaveBeenCalledTimes(1);
      expect(reducerMock).toHaveBeenCalledWith(expectedState, stateModelProp, expectedValue);
    });

    it('calls validator', () => {
      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      expect(validatorMock).toHaveBeenCalledTimes(1);
    });

    it('don\'t mutate existing state value with reducer', () => {
      const expectedModel = { [stateModelProp]: 2 };
      reducerMock.mockReturnValue(expectedModel);

      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      const [[{ model }]] = validatorMock.mock.calls;
      expect(model).not.toBe(expectedModel);
    });

    it('applies reducer model changes to validator', () => {
      const expectedModel = { [stateModelProp]: 2 };
      reducerMock.mockReturnValue(expectedModel);

      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      const [[{ model }]] = validatorMock.mock.calls;
      expect(model).toStrictEqual(expectedModel);
    });

    it('correctly merge reducer model changes and applies it to validator', () => {
      const testStateValueMock = {
        model: {
          propA: 0,
          probB: 0,
        },
        dictionary: {},
      };
      const reducerChanges = { propA: 2 };
      const expectedModel = {
        ...testStateValueMock.model,
        ...reducerChanges,
      };
      reducerMock.mockReturnValue(reducerChanges);
      stateMock.getCurrent.mockReturnValue(testStateValueMock);

      const [, dispatcher] = createStateManager(
        testStateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      const [[{ model }]] = validatorMock.mock.calls;
      expect(model).toStrictEqual(expectedModel);
    });

    it('calls all needed callbacks', () => {
      const neededCallbacks = [jest.fn(), jest.fn(), jest.fn()];
      callbacksMiddlewareMock.mockReturnValue(neededCallbacks);

      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      neededCallbacks.forEach((callbackMock) => {
        expect(callbackMock).toHaveBeenCalledTimes(1);
      });
    });

    it('calls state\'s commitUpdates and updates state\'s model if model has changes after middleware', () => {
      controlledMiddlewareMock.mockReturnValue([{}, true]);

      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      expect(stateMock.commitUpdates).toHaveBeenCalledTimes(1);
      expect(stateMock.addUpdate).toHaveBeenCalledTimes(1);
    });

    it('doesn\'t call state\'s commitUpdates and doesn\'t update state\'s model '
      + 'if model has changes after middleware', () => {
      controlledMiddlewareMock.mockReturnValue([{}, false]);

      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );
      dispatcher.dispatch(stateModelProp, {});

      expect(stateMock.commitUpdates).not.toHaveBeenCalled();
      expect(stateMock.addUpdate).not.toHaveBeenCalled();
    });

    it('calls state\'s triggerRender only if model has changes after middleware', () => {
      const [, dispatcher] = createStateManager(
        stateValueMock,
        {},
        { [stateModelProp]: jest.fn() },
      );

      controlledMiddlewareMock.mockReturnValue([{}, false]);
      dispatcher.dispatch(stateModelProp, {});

      expect(stateMock.triggerRender).not.toHaveBeenCalled();

      controlledMiddlewareMock.mockReturnValue([{}, true]);
      dispatcher.dispatch(stateModelProp, {});

      expect(stateMock.triggerRender).toHaveBeenCalledTimes(1);
    });
  });
});
