import { Inject, Injectable, Injector, Optional, TemplateRef, Type } from '@angular/core';
import { DynamicComponentService } from '../../utils/dynamic-component';
import { MESSAGE_BOX_CONFIG, MESSAGE_BOX_DEFAULT_CONFIG, MessageBoxConfig } from '../utils/message-box-config.class';
import { MESSAGE_BOX_REF, MessageBoxRef } from '../utils/message-box-ref.class';
import { DialogBaseService } from '../../dialog/base/dialog-base.service';
import { MessageBoxContainerComponent } from '../message-box-container/message-box-container.component';

@Injectable()
export class MessageBoxService extends DialogBaseService<MessageBoxContainerComponent> {

    constructor(
        dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(MESSAGE_BOX_DEFAULT_CONFIG) private _defaultConfig: MessageBoxConfig
    ) {
        super(dynamicComponentService);
    }

    /**
     * Opens a message box component with provided content.
     * @param contentType Content of the message box component.
     * @param config Configuration of the message box component.
     */
    public open(contentType: Type<any> | TemplateRef<any>, config?: MessageBoxConfig): MessageBoxRef {
        const messageBoxRef = new MessageBoxRef();

        config = this._applyDefaultConfig(config, this._defaultConfig || new MessageBoxConfig());
        messageBoxRef.data = config.data;

        const injector = Injector.create({
            providers: [
                { provide: MESSAGE_BOX_CONFIG, useValue: config },
                { provide: MESSAGE_BOX_REF, useValue: messageBoxRef }
            ]
        });

        const component = this._dynamicComponentService.createDynamicComponent<MessageBoxContainerComponent>
        (
            contentType,
            MessageBoxContainerComponent,
            config,
            { injector: injector }
        );

        this._dialogs.push(component);

        const defaultBehaviourOnClose = () => {
            this._destroyDialog(component);
            refSub.unsubscribe();
        };

        const refSub = messageBoxRef.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return messageBoxRef;
    }

}