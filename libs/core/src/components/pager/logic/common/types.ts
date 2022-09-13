interface IPagerItem {
  label: string;
  value: number;
  selectable: boolean;
  selected: boolean;
  template: unknown;
}

export type {
  IPagerItem,
}
