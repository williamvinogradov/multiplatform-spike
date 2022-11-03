import {createObservable, ObservableInternal} from '../utils';


interface StateValue<TModel, TDictionary> {
  model: TModel;
  dictionary: TDictionary;
}

interface State<TModel, TDictionary>
  extends ObservableInternal<StateValue<TModel, TDictionary>>{
  getValue: () => StateValue<TModel, TDictionary>;
  updatePart: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  completeUpdate: (rollback?: boolean) => void;
}

const createState = <TModel, TDictionary>(
  initialState: StateValue<TModel, TDictionary>
): State<TModel, TDictionary> => {
  let stateValue = initialState;
  let updatedStateValue = initialState;

  const {emit, subscribe} = createObservable<StateValue<TModel, TDictionary>>();


  const getValue = () => stateValue;

  const updatePart = (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>): void => {
    updatedStateValue = {
      model: {
        ...updatedStateValue.model,
        ...statePart?.model,
      },
      dictionary: {
        ...updatedStateValue.dictionary,
        ...statePart?.dictionary,
      }
    };
  };

  const completeUpdate = (rollback = false) => {
    if (rollback) {
      updatedStateValue = stateValue;
    }

    stateValue = updatedStateValue;
  };

  return {
    emit,
    subscribe,
    getValue,
    updatePart,
    completeUpdate,
  }
}

export type {StateValue, State};
export {createState};
