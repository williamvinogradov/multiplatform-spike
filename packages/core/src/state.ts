import {
  createObservableEmitter,
  ObjectType,
  SubscribeFunc,
} from './utils';

export type StateValueFunc<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  > = (state: StateValue<TModel, TDictionary>) => void;

export interface StateValue<TModel extends ObjectType, TDictionary extends ObjectType> {
  model: TModel;
  dictionary: TDictionary;
}

export interface State<TModel extends ObjectType, TDictionary extends ObjectType> {
  getCurrent: () => StateValue<TModel, TDictionary>;
  addUpdate: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  commitUpdates: () => void;
  rollbackUpdates: () => void;
  triggerRender: StateValueFunc<TModel, TDictionary>;
  subscribeForRender: SubscribeFunc<StateValue<TModel, TDictionary>>;
}

export function createState<TModel extends ObjectType, TDictionary extends ObjectType>(
  initialState: StateValue<TModel, TDictionary>,
): State<TModel, TDictionary> {
  let current = initialState;
  let next = initialState;

  const { emit, subscribe } = createObservableEmitter<StateValue<TModel, TDictionary>>(
    initialState,
  );

  const getCurrent = () => current;

  const addUpdate = (
    statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>,
  ): void => {
    next = {
      model: {
        ...next.model,
        ...statePart.model,
      },
      dictionary: {
        ...next.dictionary,
        ...statePart.dictionary,
      },
    };
  };

  const commitUpdates = () => {
    current = next;
  };

  const rollbackUpdates = () => {
    next = current;
  };

  return {
    getCurrent,
    addUpdate,
    commitUpdates,
    rollbackUpdates,
    triggerRender: emit,
    subscribeForRender: subscribe,
  };
}
