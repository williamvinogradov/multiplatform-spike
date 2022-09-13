import {IDxSLideToggleIndicatorViewProps, IDxSlideToggleTextViewProps} from '../views';

type TIndicatorViewTemplate = (props: IDxSLideToggleIndicatorViewProps) => JSX.Element;
type TTextViewTemplate = (props: IDxSlideToggleTextViewProps) => JSX.Element;

export type {
  TIndicatorViewTemplate,
  TTextViewTemplate,
}
