import {State, TSelectStateFunc} from "./state";
import {Subscription} from "rxjs";

type TOutputCallback<TOutputs> = (result: TOutputs[keyof TOutputs]) => void;
type TOutputSelector<TState, TOutputs> = TSelectStateFunc<TState, TOutputs[keyof TOutputs]>;

type TOutputManagerMap<TState, TOutputs> = Record<keyof TOutputs, {
  selector: TSelectStateFunc<TState, TOutputs[keyof TOutputs]>;
  callback: TOutputCallback<TOutputs>;
}>

class OutputManager<TState, TOutputProps> {
  private subscriptions: Subscription[] = [];

  constructor(
    private state: State<TState>,
    private selectorMap: Record<keyof TOutputProps, TOutputSelector<TState, TOutputProps>>) {
  }

  startListenState(callbackMap: Record<keyof TOutputProps, TOutputCallback<TOutputProps>>): void {
    (Object.keys(this.selectorMap) as Array<keyof TOutputProps>).forEach((key) => {
      const selector = this.selectorMap[key];
      const callback = callbackMap[key]
      const subscription = this.state.select(selector, true)
        .subscribe((result) => callback(result));
      this.subscriptions.push(subscription);
    });
  }

  destroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

export {
  TOutputCallback,
  TOutputSelector,
  TOutputManagerMap,
  OutputManager,
}