import { IErrorData } from '../interfaces/error-data';
import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorItem } from './ngc-error-item.model';


class NgcErrorItemSpec extends NgcErrorItem {

    constructor(
        type: string,
        module: string | null,
        config: Required<NgCatcherConfig>,
    ) {
        super(type, module, config);
    }

    public getItem(): IErrorItem {
        return {
            type: this.eType,
            module: this.eModule,
            project: this.eProject,
            version: this.eVersion,
            sessionId: this.eSessionId,
            params: this.eParams,
        };
    }

}

describe('NgcErrorItem', () => {
    const config: Required<NgCatcherConfig> = {
        serviceUrl: 'https://httpstat.us/200',
        project: 'ng-catcher-test',
        version: '0.0',
        sessionId: 'someRandomIdentifier',
        maxQueue: 1,
        maxTimeout: 5,
        retryMax: 3,
        retryTimeout: 5,
        params: { param: false },
    };

    const errorData: IErrorData = {
        type: '_type',
        module: null,
        description: '_description',
        details: {},
    };

    let errorItem: NgcErrorItemSpec | undefined;

    beforeEach(() => errorItem = undefined);

    it('should be instantiated', () => {
        errorItem = new NgcErrorItemSpec(errorData.type, errorData.module, config);
        expect(errorItem).toBeTruthy();
    });

    it('should return item', () => {
        errorItem = new NgcErrorItemSpec(errorData.type, errorData.module, config);
        expect(errorItem.getItem()).toBeTruthy();
    });

    it('should contain all other params', () => {
        errorItem = new NgcErrorItemSpec(errorData.type, errorData.module, config);
        expect(errorItem.getItem()).toEqual({
            type: errorData.type,
            module: errorData.module,
            project: config.project,
            version: config.version,
            sessionId: config.sessionId,
            params: config.params,
        });
    });
});
