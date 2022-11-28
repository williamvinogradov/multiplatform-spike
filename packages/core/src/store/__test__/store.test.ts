import { createStateManager } from '../../state-manager';
import { createObservableEmitter, pipe } from '../../utils';
import { executeCallbacks } from '../execute-callbacks';
import { updateState } from '../update-state';
import { createStore, UpdateSource } from '../index';

jest.mock('../../state-manager');
jest.mock('../../utils');
jest.mock('../execute-callbacks');
jest.mock('../update-state');

const stateManagerMock = {
  getCurrent: jest.fn(),
  getNext: jest.fn(),
  addUpdate: jest.fn(),
  commitUpdates: jest.fn(),
  rollbackUpdates: jest.fn(),
};
const emitMock = jest.fn();
const subscribeMock = jest.fn();
const validatorMock = jest.fn();

const createStateManagerMock = jest.mocked(createStateManager);
const createObservableMock = jest.mocked(createObservableEmitter);
const pipeMock = jest.mocked(pipe);
const callCallbacksMock = jest.mocked(executeCallbacks);
const changeStateMock = jest.mocked(updateState);

describe('Core: Store', () => {
  beforeEach(() => {
    createStateManagerMock.mockReturnValue(stateManagerMock);
    pipeMock.mockReturnValue(validatorMock);
    createObservableMock
      .mockReturnValue({ emit: emitMock, subscribe: subscribeMock, getValue: jest.fn() });
  });

  describe('commitUpdates with source = props', () => {
    it('calls state commitUpdates', () => {
      const store = createStore({}, {});
      store.commitUpdates(UpdateSource.props);

      expect(stateManagerMock.commitUpdates).toHaveBeenCalledTimes(1);
    });

    it('calls the validator with the current state', () => {
      const currentState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);

      const store = createStore({}, {});
      store.commitUpdates(UpdateSource.props);

      expect(validatorMock).toHaveBeenCalledWith(currentState);
    });

    it('calls the changeState with the current and validated states', () => {
      const currentState = {};
      const validatedState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);
      validatorMock.mockReturnValue(validatedState);

      const store = createStore({}, {});
      store.commitUpdates(UpdateSource.props);

      expect(changeStateMock).toHaveBeenCalledWith(currentState, validatedState, expect.anything());
    });

    it('always emits the last current state', () => {
      const state = {};
      const expectedState = {};
      stateManagerMock.getCurrent.mockReturnValue(state);
      changeStateMock.mockImplementation(() => {
        stateManagerMock.getCurrent.mockReturnValue(expectedState);
        return false;
      });

      const store = createStore({}, {});
      store.commitUpdates(UpdateSource.props);

      expect(emitMock).toHaveBeenCalledWith(expectedState);
    });

    it('calls the callCallbacks with the current and validated states', () => {
      const currentState = {};
      const validatedState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);
      validatorMock.mockReturnValue(validatedState);

      const store = createStore({}, {});
      store.commitUpdates(UpdateSource.props);

      expect(callCallbacksMock)
        .toHaveBeenCalledWith(currentState, validatedState, expect.anything());
    });
  });

  describe('commitUpdates with source = action (default)', () => {
    it('calls the validator with the next state', () => {
      const nextState = {};
      stateManagerMock.getNext.mockReturnValue(nextState);

      const store = createStore({}, {});
      store.commitUpdates();

      expect(validatorMock).toHaveBeenCalledWith(nextState);
    });

    it('calls the changeState with the current and validated state', () => {
      const currentState = {};
      const validatedState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);
      validatorMock.mockReturnValue(validatedState);

      const store = createStore({}, {});
      store.commitUpdates();

      expect(changeStateMock).toHaveBeenCalledWith(currentState, validatedState, expect.anything());
    });

    it('emits the current state when changeState returns changes', () => {
      const currentState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);
      changeStateMock.mockReturnValue(true);

      const store = createStore({}, {});
      store.commitUpdates();

      expect(emitMock).toHaveBeenCalledWith(currentState);
    });

    it('does not emit the current state when changeState does not return changes', () => {
      const currentState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);
      changeStateMock.mockReturnValue(false);

      const store = createStore({}, {});
      store.commitUpdates();

      expect(emitMock).not.toHaveBeenCalled();
    });

    it('calls callCallbacks with the current and validated states', () => {
      const currentState = {};
      const validatedState = {};
      stateManagerMock.getCurrent.mockReturnValue(currentState);
      validatorMock.mockReturnValue(validatedState);

      const store = createStore({}, {});
      store.commitUpdates();

      expect(callCallbacksMock)
        .toHaveBeenCalledWith(currentState, validatedState, expect.anything());
    });
  });

  describe('commitUpdates with source = unknown', () => {
    it('throws an error if an unknown source passed', () => {
      const store = createStore({}, {});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const callCommitUpdates = () => store.commitUpdates('123' as any);

      expect(callCommitUpdates).toThrow();
    });
  });

  describe('getState', () => {
    it('is state method', () => {
      const store = createStore({}, {});

      expect(store.getState).toBe(stateManagerMock.getCurrent);
    });
  });

  describe('subscribe', () => {
    it('is observable method', () => {
      const store = createStore({}, {});

      expect(store.subscribe).toBe(subscribeMock);
    });
  });

  describe('addUpdate', () => {
    it('is state method', () => {
      const store = createStore({}, {});

      expect(store.addUpdate).toBe(stateManagerMock.addUpdate);
    });
  });

  describe('rollbackUpdates', () => {
    it('is state method', () => {
      const store = createStore({}, {});

      expect(store.rollbackUpdates).toBe(stateManagerMock.rollbackUpdates);
    });
  });
});
