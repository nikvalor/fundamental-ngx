import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 *
 * ```html
 * <div fd-form-header>Form Header</div>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-form-header]',
    template: `<span class="fd-form-header__text"><ng-content></ng-content></span>`,
    styleUrls: ['./form-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormHeaderComponent {
     /** @hidden */
     @HostBinding('class.fd-form-header')
     fdFormHeaderClass = true;
}
