export * from './propsToContracts';
export * from './valueChangeCallback';

export type ViewTemplate<TProps> = (props: TProps) => JSX.Element;
