import React from 'react';
// TODO Vitik: looks like something doesn't turned right in building flow. Without .js get the next error: 
// Module not found: Error: Can't resolve 'devextreme-react/select-box' in '/Users/mikevitik/code/multiplatform-spike/dist/react/components/selectbox'
// Did you mean 'select-box.js'?
// BREAKING CHANGE: The request 'devextreme-react/select-box' failed to resolve only because it was resolved as fully specified
import { SelectBox } from 'devextreme-react/select-box.js';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';
import type { template } from 'devextreme/core/templates/template';

//* Component={"name":"DxSelectBox", "jQueryRegistered":true, "hasApiMethod":false}
export function DxSelectBox(props: { readOnly?: boolean, itemTemplate : template}) {
    return (
        <div>
            <span>Devextreme selectbox is here:</span>
            <SelectBox items={[1, 2, 3]} 
            readOnly={props.readOnly} 
            itemTemplate={props.itemTemplate}>
            </SelectBox>
        </div>)
}

DxSelectBox.defaultProps = {};
