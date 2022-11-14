import registerComponent from 'devextreme/core/component_registrator';
import { createVNode, createTextVNode, findDOMfromVNode } from 'inferno';
import domAdapter from 'devextreme/core/dom_adapter';
import { getPublicElement } from 'devextreme/core/element';
import { createElement } from 'inferno-create-element';
import render from 'devextreme/core/inferno_renderer';

import BaseComponent from 'devextreme/renovation/component_wrapper/common/component';
import $ from 'devextreme/core/renderer';
import { DxPager } from './generated/components/pager/dxPager';
import { TemplateWrapper } from 'devextreme/renovation/component_wrapper/common/template_wrapper';

import { DxPagerPageNumberItemView, DxPagerPageNumberView } from './generated/components/pager/views';

function replaceChild(parentDOM, newDom, lastDom) {
  parentDOM.replaceChild(newDom, lastDom);
}

// TODO Vitik temporary solution use isEqual for conditional content update
TemplateWrapper.prototype.shouldComponentUpdate = function(nextProps) {
  if(this.__templateContent &&
    (!this.props.model.isEqual || !this.props.model.isEqual(this.props.model.data, nextProps.model.data))) {
    const result = this.getTemplateContent(nextProps);
    replaceChild(this.__parent, result, this.__templateContent);
    this.__templateContent = result;
  }
  return false;
}

TemplateWrapper.prototype.componentWillUnmount = function() {
  this.__templateContent.remove();
}

TemplateWrapper.prototype.getTemplateContent = function(props) {
  const {
    data, index,
  } = props.model ?? { data: {} };

  if(data) {
    Object.keys(data).forEach((name) => {
      if(data[name] && domAdapter.isNode(data[name])) {
        data[name] = getPublicElement($(data[name]));
      }
    });
  }

  return this.props.template.render({
    container: getPublicElement($(this.__parent)),
    transclude: this.props.transclude,
    ...{ renovated: this.props.renovated },
    ...!this.props.transclude ? { model: data } : {},
    ...!this.props.transclude && Number.isFinite(index) ? { index } : {},
  })[0];
}

TemplateWrapper.prototype.renderTemplate = function() {
  // eslint-disable-next-line spellcheck/spell-checker
  const node = findDOMfromVNode(this.$LI, true);
  this.__parent = node.parentNode;
  this.__templateContent = this.getTemplateContent(this.props);

  node.after(this.__templateContent);
}

TemplateWrapper.prototype.render = function() {
  return createTextVNode("");
}
// TODO Vitik temporary solution
class RootTemplateWrapper extends TemplateWrapper {
  render() {
    return createVNode(1, "div");
  }
}

export default class Pager extends BaseComponent {
  _initializeComponent() {
    super._initializeComponent();
    this._propsInfo.templates.forEach((template) => {
      this._componentTemplates[template] = this._createTemplateComponent(this._props[template], template);
    });
  }
  _createTemplateComponent(templateOption, templateName) {
    if(templateName === 'pagerView' && templateOption !== null) {
      const template = this._getTemplate(templateOption);
      return (model) => createElement(
        RootTemplateWrapper, { template, model },
      );
    }
    return super._createTemplateComponent(templateOption);
  }
  getProps() {
    return super.getProps();
  }

  get _propsInfo() {
    return {
      twoWay: [['selectedPageSize', 'defaultSelectedPageSize', 'selectedPageSizeChange'], ['selectedPage', 'defaultSelectedPage', 'selectedPageChange'],],
      allowNull: [],
      elements: [],
      templates: ['pagerView', 'pageNumberView', 'pageNumberItemView', 'pageNumberFakeItemView', 'pageSizeItemView'],
      props: ['selectedPage', 'pageCount', 'pageSizes', 'pager', 'pageNumber', 'pageNumberItem', 'pageNumberFakeItem', 'selectedPageSize', 'pageSizeItem', 'selectedPageChange', 'selectedPageSizeChange'],
    };
  }

  get _viewComponent() {
    return DxPager;
  }
}

registerComponent('dxPager', Pager);

window.DXInfernoTemplateWrapper = render.render;

window.DXViews = {
  'DxPagerPageNumberItemView': (props, containerNode) => {
    render.render(DxPagerPageNumberItemView, { data: props }, containerNode, false);
  },
  'DxPagerPageNumberView': (props, containerNode) => {
    render.render(DxPagerPageNumberView, { data: props }, containerNode, false);
  }
}
