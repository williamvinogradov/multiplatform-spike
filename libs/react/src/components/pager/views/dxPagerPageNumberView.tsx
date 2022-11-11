import React from 'react';
import { ItemReactVM, PageNumberItemTemplate, PageNumberReactVM } from '../types';

interface DxPagerPageNumberViewProps {
  // TODO jQuery: Temporary wrapping for the inferno generator.
  data: {
    viewModel: PageNumberReactVM;
    selectPage: (pageNumber: number) => void;
  }
}
// Temporary possible solution for fix all templates rerendering
const isEqual = (a: {item: ItemReactVM<PageNumberItemTemplate>}, b:{ item: ItemReactVM<PageNumberItemTemplate>}) => {
  return a.item.value === b.item.value && a.item.selected === b.item.selected;
}

const DxPagerPageNumberView = ({ data: { viewModel, selectPage } }: DxPagerPageNumberViewProps) => {
  return (
    <div className="dx-pager-pages">
      {
        viewModel.items.map((item, key) => {
          const ItemComponent = item.template as any;
          return <ItemComponent key={key} data={{ item, selectPage }} isEqual={isEqual}></ItemComponent>
        }
        )
      }
    </div >
  )
};

export type { DxPagerPageNumberViewProps };
export { DxPagerPageNumberView };
