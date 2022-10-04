import registerComponent from 'devextreme/core/component_registrator';
import BaseComponent from 'devextreme/renovation/component_wrapper/common/component';
import {DxPager} from './generated/components/pager/dxPager';

export default class Pager extends BaseComponent {
  getProps() {
    return super.getProps();
  }

  get _propsInfo() {
    return {
      twoWay: [['pageSize', 'defaultPageSize', 'pageSizeChange'], ['pageIndex', 'defaultPageIndex', 'pageIndexChange'],],
      allowNull: [],
      elements: [],
      templates: ['pagerTemplate', 'pageNumberTemplate', 'pageNumberItemTemplate', 'pageSizeTemplate', 'pageSizeItemTemplate'],
      props: ['selectedPage', 'pageCount', 'pageSizes', 'pager', 'pageNumber', 'pageNumberItem', 'pageNumberFakeItem', 'pageSize', 'pageSizeItem'],
    };
  }

  get _viewComponent() {
    return DxPager;
  }
}

registerComponent('dxPager', Pager);
