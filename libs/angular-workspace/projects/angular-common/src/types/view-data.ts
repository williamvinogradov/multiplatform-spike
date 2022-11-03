interface AngularViewModelData<TViewModel> {
  viewModel: TViewModel;
}

interface AngularViewActionsData<TActions> {
  actions: TActions;
}

interface AngularViewData<TViewModel, TActions>
  extends AngularViewModelData<TViewModel>,
    AngularViewActionsData<TActions> {
}

export type {
  AngularViewModelData,
  AngularViewActionsData,
  AngularViewData,
}
