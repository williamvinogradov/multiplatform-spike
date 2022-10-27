import { createComponentVNode, normalizeProps } from "inferno";
import LegasySelectbox from 'devextreme/ui/select_box'
import { DomComponentWrapper } from '../common/domComponerntWrapper';

// TODO Vitik: export props type
export function SelectBox(props) {
    return normalizeProps(
        createComponentVNode(
            2,
            DomComponentWrapper,
            {
                componentType: LegasySelectbox,
                templateNames: ['itemTemplate'],
                componentProps: props
            }
        )
    );
}