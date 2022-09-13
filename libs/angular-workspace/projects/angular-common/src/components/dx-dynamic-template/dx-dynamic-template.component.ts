import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {TAngularTemplate, TNullable} from '../../types2';
import {DxViewComponent} from './dx-view.component';

interface ITemplateContext<TComponent> {
  $implicit: TComponent;
}

@Component({
  selector: 'dx-dynamic-template',
  template: '',
  styles: [':host {display: none; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxDynamicTemplateComponent<TComponent extends DxViewComponent> {
  @Input() set template(template: TNullable<TAngularTemplate<TComponent>>) {
    template && this.setTemplate(template);
  }

  @Input() set data(templateData: TNullable<unknown>) {
    const typedTemplateData = templateData as TNullable<TComponent>;
    this.templateData = typedTemplateData;
    typedTemplateData && this.setTemplateData();
  }

  private templateData: TNullable<TComponent> = null;
  private componentRef: TNullable<ComponentRef<TComponent>> = null;
  private templateRef: TNullable<EmbeddedViewRef<ITemplateContext<TComponent>>> = null;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  private setTemplate(template: TAngularTemplate<TComponent>): void {
    if (template instanceof TemplateRef) {
      this.templateRef = this.viewContainerRef.createEmbeddedView(template);
    } else {
      this.componentRef = this.viewContainerRef.createComponent(template);
    }
  }

  private setTemplateData(): void {
    if (!this.templateData) {
      return;
    }

    if (this.componentRef) {
      const {instance} = this.componentRef;

      (Object.keys(this.templateData) as (keyof TComponent)[]).forEach((dataKey) => {
        instance[dataKey] = this.templateData![dataKey];
      });

      instance.markForCheck();
    }

    if (this.templateRef) {
      this.templateRef.context = { $implicit: this.templateData };
    }
  }
}
