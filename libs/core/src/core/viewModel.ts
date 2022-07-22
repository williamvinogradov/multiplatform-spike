abstract class ViewModelGenerator<TState, TViewModel> {
  abstract generate(state: TState): TViewModel;
}

export { ViewModelGenerator };