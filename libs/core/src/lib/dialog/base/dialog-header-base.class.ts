import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    Directive,
    QueryList,
    TemplateRef
} from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';
import { TitleComponent } from '../../title/title.component';

@Directive()
export abstract class DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    headerTemplate: TemplateRef<any>;

    /** @hidden */
    subHeaderTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChild(TitleComponent)
    set defaultTitleSize(title: TitleComponent) {
        if (title && !title.headerSize) {
            title.headerSize = 5;
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach(template => {
            switch (template.getName()) {
                case 'header':
                    this.headerTemplate = template.templateRef;
                    break;
                case 'subheader':
                    this.subHeaderTemplate = template.templateRef;
                    break;
            }
        });
    }
}
