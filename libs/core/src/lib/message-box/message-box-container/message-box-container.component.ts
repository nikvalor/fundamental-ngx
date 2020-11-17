import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Inject,
    Input,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../../utils/interfaces/css-class-builder.interface';
import { DynamicComponentContainer } from '../../utils/dynamic-component/';
import { MESSAGE_BOX_CONFIG, MessageBoxConfig } from '../utils/message-box-config.class';
import { MESSAGE_BOX_REF, MessageBoxRef } from '../utils/message-box-ref.class';

type ContentType = Type<any> | TemplateRef<any>

@Component({
    selector: 'fd-message-box-container',
    template: '<ng-container #contentContainer></ng-container>'
})
export class MessageBoxContainerComponent extends DynamicComponentContainer<ContentType>
    implements AfterViewInit, CssClassBuilder {

    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** @hidden */
    @ViewChild('contentContainer', { read: ViewContainerRef }) containerRef: ViewContainerRef;

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(
        @Inject(MESSAGE_BOX_CONFIG) public messageBoxConfig: MessageBoxConfig,
        @Inject(MESSAGE_BOX_REF) private _messageBoxRef: MessageBoxRef,
        elementRef: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        super(elementRef, componentFactoryResolver);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._loadContent();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.messageBoxConfig.containerClass ? this.messageBoxConfig.containerClass : '',
            this._class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden Load received content */
    protected _loadContent(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent, this._templateContext());
        } else {
            // this._createFromDefaultConfiguration(this.childContent);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): object {
        return { $implicit: this._messageBoxRef, messageBoxConfig: this.messageBoxConfig };
    }

    /** @hidden Load Dialog component from passed object */
    // private _createFromDefaultConfiguration(config: DefaultDialogObject): void {
    //     this.containerRef.clear();
    //     const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DefaultDialogComponent);
    //     this._componentRef = this.containerRef.createComponent(componentFactory);
    //     this._componentRef.instance.defaultDialogConfig = config;
    // }
}