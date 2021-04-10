import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';


export abstract class NgcErrorItem {

    protected readonly eType: string;
    protected readonly eModule: string | null;
    protected readonly eProject: Required<NgCatcherConfig>['project'];
    protected readonly eVersion: Required<NgCatcherConfig>['version'];
    protected readonly eSessionId: Required<NgCatcherConfig>['sessionId'];
    protected readonly eParams: Required<NgCatcherConfig>['params'];

    protected constructor(
        type: string,
        module: string | null,
        config: Required<NgCatcherConfig>,
    ) {
        this.eType = type;
        this.eModule = module;
        this.eProject = config.project;
        this.eVersion = config.version;
        this.eSessionId = config.sessionId;
        this.eParams = config.params ?? null;
    }

    public abstract getItem(): IErrorItem;

}
