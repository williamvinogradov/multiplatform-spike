//import { MutableRefObject } from 'react';
//import * as React from 'react';
import {
    useContext,
    useCallback,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from '@devextreme/runtime/inferno-hooks';
import { createVNode, RefObject } from "inferno";
import $ from 'devextreme/core/renderer';

import { renderTemplate, hasTemplate } from '@devextreme/runtime/inferno';
import DomComponent from 'devextreme/core/dom_component';
import { ComponentClass } from 'devextreme/core/dom_component';
// TODO Vitik: uncomment after move to real repo
// import { ConfigContextValue, ConfigContext } from '../../common/config_context';
import { getUpdatedOptions } from 'devextreme/renovation/ui/common/utils/get_updated_options';
export type EventCallback<T = undefined> = T extends undefined ? () => void : (value: T) => void;

interface ComponentProps {
    className?: string;
    itemTemplate?: string | (() => string | HTMLElement);
    valueChange?: EventCallback<any>;
}
const normalizeProps = (props: ComponentProps): ComponentProps =>
    Object.keys(props).reduce((accumulator, key) => {
        if (props[key] !== undefined) {
            accumulator[key] = props[key];
        }
        return accumulator;
    }, {});
export const viewFunction = ({
    props: {
        componentProps: { className },
    },
    restAttributes,
    widgetRef,
}: DomComponentWrapper): any => (
    createVNode(1, "div", className, null, 0, restAttributes, null, widgetRef)
    //<div ref={widgetRef} className={className} {...restAttributes} />
);

export type DomComponentWrapperPropsType = {
    // rootElementRef?: MutableRefObject<HTMLDivElement | null>;
    componentType: ComponentClass<Record<string, any>>;
    templateNames: string[];
    componentProps: ComponentProps;
};
export const DomComponentWrapperProps: DomComponentWrapperPropsType =
    {} as any as DomComponentWrapperPropsType;

export type DomComponentWrapperRef = { getInstance: () => DomComponent | null };
type RestProps = {
    className?: string;
    style?: { [name: string]: any };
    key?: any;
    ref?: any;
};
interface DomComponentWrapper {
    props: typeof DomComponentWrapperProps & RestProps;
    widgetRef: any;
    // config?: ConfigContextValue;
    // properties: Record<string, unknown>;
    restAttributes: RestProps;
}

//* Component={"name":"DomComponentWrapper","jQueryRegistered":false,"hasApiMethod":true}
const DomComponentWrapper = forwardRef<
    //    DomComponentWrapperRef,
    typeof DomComponentWrapperProps & RestProps,
    typeof DomComponentWrapperProps & RestProps
>(function domComponentWrapper(
    props: typeof DomComponentWrapperProps & RestProps,
    ref
) {
    const __widgetRef: RefObject<HTMLDivElement | null> =
        useRef<HTMLDivElement>(null);
    const instance = useRef<DomComponent | null>();
    const prevProps = useRef<Record<string, unknown>>();
    //const config = useContext(ConfigContext);
    const __properties = useCallback(
        function __properties(): Record<string, unknown> {
            const normalizedProps = normalizeProps(props.componentProps);
            const { valueChange, ...restProps } = normalizedProps;
            const properties = {
                // rtlEnabled: !!config?.rtlEnabled,
                isRenovated: true,
                ...restProps,
            } as Record<string, unknown>;
            if (valueChange) {
                properties.onValueChanged = ({ value }): void => valueChange(value);
            }
            const templates = props.templateNames;
            templates.forEach((name) => {
                if (hasTemplate(name, properties, this)) {
                    properties[name] = (item, index, container): void => {
                        // TODO possible fix in https://github.com/DevExpress/devextreme-renovation/blob/master/packages/runtime/inferno/render_template.ts#L10
                        const _item = $(item);
                        const _container = $(container);
                        renderTemplate(
                            props.componentProps[name],
                            { item: _item, index, container: _container as any },
                            this
                        );
                    };
                }
            });
            return properties;
        },
        [props.componentProps, /*config,*/ props.templateNames]
    );
    const __restAttributes = useCallback(
        function __restAttributes(): RestProps {
            const {
                componentProps,
                componentType,
                // rootElementRef,
                templateNames,
                ...restProps
            } = props;
            return restProps;
        },
        [props]
    );
    const __getInstance = useCallback(
        function __getInstance(): DomComponent | null {
            return instance.current!;
        },
        [instance]
    );
    useEffect(() => {
        const componentInstance = new props.componentType(
            __widgetRef.current!,
            __properties()
        );
        instance.current! = componentInstance;
        return (): void => {
            componentInstance.dispose();
            instance.current! = null;
        };
    }, []);
    /*useEffect(() => {
        const { rootElementRef } = props;
        if (rootElementRef) {
            rootElementRef.current = __widgetRef.current;
        }
    }, []);*/
    useEffect(() => {
        const instance = __getInstance();
        if (!instance) {
            return;
        }
        const updatedOptions = getUpdatedOptions(
            prevProps.current! || {},
            __properties()
        );
        if (updatedOptions.length) {
            instance.beginUpdate();
            updatedOptions.forEach(({ path, value }) => {
                instance.option(path, value);
            });
            instance.endUpdate();
        }
        prevProps.current! = __properties();
    }, [__getInstance, prevProps, __properties]);
    useImperativeHandle(ref, () => ({ getInstance: __getInstance }), [
        __getInstance,
    ]);
    return viewFunction({
        props: { ...props },
        widgetRef: __widgetRef,
        // config,
        // properties: __properties(),
        restAttributes: __restAttributes(),
    });
});
export { DomComponentWrapper };

export default DomComponentWrapper;

DomComponentWrapper.defaultProps = DomComponentWrapperProps;
