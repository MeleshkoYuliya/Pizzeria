import {
  ComponentFactoryResolver,
  Type,
  Injectable,
  ViewContainerRef,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';

import { ModalContext } from './modal-context';
import { ModalContainer } from './modal-container';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@Injectable()
export class ModalService {

  private viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  registerViewContainer (vcf: ViewContainerRef) {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
    this.viewContainerRef = vcf;
  }

  open<T> (type: Type<any>, data?: any, options: { hideOnBackdropClick?: boolean, containerType: Type<any> } = { containerType: ModalContainerComponent }): Promise<T> {
    if (!this.viewContainerRef) {
      return Promise.reject('No view container');
    }
    const container = <ComponentRef<ModalContainer>>this.container(options.containerType);
    const injector = ReflectiveInjector.resolveAndCreate([ModalContext], container.instance.container.injector);
    const context = injector.get(ModalContext);
    context.data = data;
    if (!options || options.hideOnBackdropClick) {
      container.instance.context = context;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
    const componentRef = container.instance.container.createComponent(componentFactory, 0, injector);
    return context.promise(container, this.viewContainerRef);
  }

  container (containerType: Type<any>): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(containerType);
    return this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length);
  }

}
