import registerComponent from 'devextreme/core/component_registrator';
import BaseComponent from 'devextreme/renovation/component_wrapper/common/component';
import { DxSelectBox } from './generated/components/selectbox';

export default class SelectBox extends BaseComponent {
  
  getProps() {
    return super.getProps();
  }

  get _propsInfo() {
    return {
      twoWay: [['value', 'defaultValue', 'valueChanged']],
      allowNull: [],
      elements: [],
      templates: ['itemTemplate'],
      props: ['readOnly'],
    };
  }

  get _viewComponent() {
    return DxSelectBox;
  }
}

registerComponent('dxSelectBoxWrapper', SelectBox);