import {getKeys} from '../utils';


interface ModelPropertyConfig<T> {
  isControlled: boolean;
  publicCallback: (value: T) => void;
}
type ModelPropertyConfigMap<TModel extends {}> = {
  [P in keyof TModel]?: ModelPropertyConfig<TModel[P]>
}

const modelChangesMiddleware = <TModel extends {}>(
  prev: TModel,
  next: TModel,
  config: ModelPropertyConfigMap<TModel>
): [TModel, boolean] => {
  let changesCount = 0;
  const result = {...next};
  getKeys(next).forEach((key) => {
    if (prev[key] === next[key]) {
      return;
    }

    changesCount++;
    const configItem = config[key];

    if (!configItem) {
      return;
    }

    if (configItem.isControlled) {
      result[key] = prev[key];
      changesCount--;
    }
  });

  return [result, changesCount > 0];
};

const modelCallbackMiddleware = <TModel extends {}>(
  prev: TModel,
  next: TModel,
  config: ModelPropertyConfigMap<TModel>
): (() => void)[] => {
  const actions: (() => void)[] = [];
  getKeys(next).forEach((key) => {
    if (prev[key] === next[key]) {
      return;
    }

    const configItem = config[key];
    if (configItem && configItem.publicCallback) {
      actions.push(() => configItem.publicCallback(next[key]));
    }
  });

  return actions;
}

export type {ModelPropertyConfig, ModelPropertyConfigMap};
export {modelChangesMiddleware, modelCallbackMiddleware};
