import {
  IDxPagerPageNumberItemViewProps,
  IDxPagerPageNumberViewProps,
  IDxPagerPageSizeItemViewProps,
  IDxPagerPageSizeViewProps,
  IDxPagerViewProps
} from '../views';

type TPagerTemplate = (props: IDxPagerViewProps) => JSX.Element;
type TPageNumberTemplate = (props: IDxPagerPageNumberViewProps) => JSX.Element;
type TPageNumberItemTemplate = (props: IDxPagerPageNumberItemViewProps) => JSX.Element;
type TPageSizeTemplate = (props: IDxPagerPageSizeViewProps) => JSX.Element;
type TPageSizeItemTemplate = (props: IDxPagerPageSizeItemViewProps) => JSX.Element;

export {
  TPagerTemplate,
  TPageNumberTemplate,
  TPageSizeTemplate,
  TPageNumberItemTemplate,
  TPageSizeItemTemplate,
}
