import {Store, TSelectStateFunc} from "../store";
import {map, Subscription} from "rxjs";

type TOutputCallback<TOutputs> = (result: TOutputs[keyof TOutputs]) => void;
type TOutputSelector<TState, TOutputs> = TSelectStateFunc<TState, TOutputs[keyof TOutputs]>;
type TOutputMapping<TOutputs, TState> = Record<keyof TOutputs, {
  selector: TOutputSelector<TState, TOutputs>,
  callback: TOutputCallback<TOutputs>
}>;

abstract class ContractManager<TOutputs, TActionTypes extends string, TState> {
  private outputSubscriptions: Subscription[] = [];

  constructor(protected store: Store<TActionTypes, TState>) {}

  mapStateChangeToOutputs(outputMapping: TOutputMapping<TOutputs, TState>): void {
    (Object.keys(outputMapping) as Array<keyof TOutputs>).forEach((key) => {
      const { selector, callback } = outputMapping[key];
      const subscription = this.store.outputState$
        .pipe(
          map((state) => selector(state)),
        ).subscribe((result) => callback(result));
      this.outputSubscriptions.push(subscription);
    });
  }

  destroy(): void {
    this.outputSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

export { ContractManager };