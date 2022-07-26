interface ISlideToggleTextVM {
  text: string;
}

function getSlideToggleTextVM(text: string): ISlideToggleTextVM {
  return {
    text,
  }
}

export {
  ISlideToggleTextVM,
  getSlideToggleTextVM
}
