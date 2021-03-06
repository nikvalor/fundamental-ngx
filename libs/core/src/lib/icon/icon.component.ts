import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * @hidden
 * The base class for the icon component
 */
const BASE_ICON_CLASS = 'sap-icon';

/**
 * @hidden
 * Prefix for icon prop classes
 */
const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';

/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval"></fd-icon>
 * ```
 */
@Component({
    selector: 'fd-icon',
    template: ``,
    styleUrls: ['./icon.component.scss'],
    host: {
        role: 'presentation'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent extends AbstractFdNgxClass {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input() glyph;

    /** @deprecated
     * Icon size is deprecated. The size can be set by font-size. It will be removed after version 0.23
     * The size of the icon
     * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
     * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
     */
    @Input() size = '';

    /** @hidden */
    _setProperties(): void {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
