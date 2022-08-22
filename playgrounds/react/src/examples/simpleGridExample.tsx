import React from 'react';
import {DxSimpleGrid, DxSimpleGridPagerAdapter} from '@dx/react/components/simpleGrid';
import {DxPager} from '@dx/react/components/pager';
import '@dx/react/simpleGrid.css';
import '@dx/react/pager.css';

import {MY_GRID_DATA} from './gridData/data';
import {MY_COLUMNS} from './gridData/columns';


function SimpleGridExample() {
  return <React.Fragment>
    <div className="example">
      <div className="example__title">
        Simple button example
      </div>
      <div className="example__control">
        <DxSimpleGrid data={MY_GRID_DATA} columns={MY_COLUMNS}>
          <DxSimpleGridPagerAdapter
            pagerComponent={DxPager}
            pageSizes={[10, 20, 30]}
            selectedPage={1}
            selectedPageSize={20}/>
        </DxSimpleGrid>
      </div>
    </div>
  </React.Fragment>
}

export {
  SimpleGridExample,
}
