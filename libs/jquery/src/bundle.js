import Pager from './pager.j';
import SelectBoxWrapper from './selectbox.j';
import {DxPagerPageSizeView} from './generated/components/pager/views/dxPagerPageSizeView';
import {render} from 'inferno';

const sizeView = (options, element) => {
  const vNode = DxPagerPageSizeView({
    viewModel: options, selectPageSize: () => {
    }
  });
  return render(vNode, element);
}


window.DevExpress = window.DevExpress || {
  ui: {
    dxPager: Pager,
    dxSelectBoxWrapper: SelectBoxWrapper
    // DxPagerPageSizeView: sizeView
  }
};
