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
import { DIALOG_REF, DialogRef } from '../utils/dialog-ref.class';
import { DIALOG_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../../utils/interfaces/css-class-builder.interface';
import { DefaultDialogObject } from '../default-dialog/default-dialog-object';
import { DefaultDialogComponent } from '../default-dialog/default-dialog.component';
import { DynamicComponentContainer } from '../../utils/dynamic-component';

type ContentType = TemplateRef<any> | Type<any> | DefaultDialogObject;

@Component({
    selector: 'fd-dialog-container',
    template: '<ng-container #contentContainer></ng-container>'
})
export class DialogContainerComponent extends DynamicComponentContainer<ContentType> implements AfterViewInit, CssClassBuilder {
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
        @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        @Inject(DIALOG_REF) private _dialogRef: DialogRef,
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
            this.dialogConfig.containerClass ? this.dialogConfig.containerClass : '',
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
            this._createFromDefaultConfiguration(this.childContent);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Returns context for embedded template*/
    private _templateContext(): object {
        return { $implicit: this._dialogRef, dialogConfig: this.dialogConfig };
    }

    /** @hidden Load Dialog component from passed object */
    private _createFromDefaultConfiguration(config: DefaultDialogObject): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DefaultDialogComponent);
        this._componentRef = this.containerRef.createComponent(componentFactory);
        this._componentRef.instance.defaultDialogConfig = config;
    }
}
