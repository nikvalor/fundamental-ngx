import { AfterContentInit, Component, Inject, Optional } from '@angular/core';
import { DIALOG_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { DialogFooterBase } from '../base/dialog-footer-base.class';

@Component({
    selector: 'fd-dialog-footer',
    templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent extends DialogFooterBase implements AfterContentInit {
    constructor(@Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig) {
        super();
        this.dialogConfig = this.dialogConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
