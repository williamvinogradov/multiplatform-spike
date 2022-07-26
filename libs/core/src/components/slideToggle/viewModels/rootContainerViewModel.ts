interface IRootContainerVM {
  value: boolean,
  textPosition: 'left' | 'right',
}

function getRootContainerVM({value, textPosition}: {value: boolean; textPosition: 'left' | 'right'}): IRootContainerVM {
  return {
    value,
    textPosition,
  }
}

export {
  IRootContainerVM,
  getRootContainerVM,
}