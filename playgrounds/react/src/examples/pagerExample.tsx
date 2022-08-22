import React from 'react';
import {DxPager} from '@dx/react/components/pager';
import '@dx/react/pager.css';


function PagerExample() {
  return <React.Fragment>
    <div className="example">
      <div className="example__title">
        Pager example
      </div>
      <div className="example__control">
        <DxPager pageCount={20}
                 selectedPage={1}
                 pageSizes={[10, 20, 30]}
                 selectedPageSize={20}
        />
      </div>
    </div>
  </React.Fragment>
}

export {
  PagerExample,
}
