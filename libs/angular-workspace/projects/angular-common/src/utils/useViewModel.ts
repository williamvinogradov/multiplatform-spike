import {ViewModel} from '@dx/core/internal/component/viewModel';
import {distinctUntilChanged, Observable, startWith, Subscriber} from 'rxjs';


// TODO: Think about how to rid off from this cast and redundant second generic parameter.
const useViewModel = <TViewModel, TAngularViewModel extends TViewModel>(
  viewModel: ViewModel<TViewModel>,
): Observable<TAngularViewModel> =>  {
  return new Observable((subscriber: Subscriber<TAngularViewModel>) => {
    viewModel.subscribe((viewModel: TViewModel) => {
      subscriber.next(viewModel as TAngularViewModel);
    });
  }).pipe(
    distinctUntilChanged(),
    startWith(viewModel.getValue() as TAngularViewModel)
  );
}

export {useViewModel};
