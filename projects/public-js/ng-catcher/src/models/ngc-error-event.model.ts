import { IErrorData } from '../interfaces/error-data';
import { IErrorEvent } from '../interfaces/error-event';
import { GenericObject } from '../interfaces/generic-object';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorItem } from './ngc-error-item.model';


export class NgcErrorEvent extends NgcErrorItem {

    private readonly eDescription: string | null;
    private readonly eDetails: GenericObject | null;
    private readonly eTime: string;

    public constructor(
        data: IErrorData,
        config: Required<NgCatcherConfig>,
        time?: Date,
    ) {
        super(data.type, data.module, config);
        this.eDescription = data.description;
        this.eDetails = data.details;
        this.eTime = time ? time.toISOString() : (new Date()).toISOString();
    }

    public getItem(): IErrorEvent {
        return {
            type: this.eType,
            module: this.eModule,
            project: this.eProject,
            version: this.eVersion,
            sessionId: this.eSessionId,
            params: this.eParams,
            description: this.eDescription,
            details: this.eDetails,
            time: this.eTime,
        };
    }

}
