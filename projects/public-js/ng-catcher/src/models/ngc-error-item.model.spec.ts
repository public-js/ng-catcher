import { assert } from 'chai';
import 'mocha';

import { IErrorData } from '../interfaces/error-data';
import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorItem } from './ngc-error-item.model';


class NgcErrorItemSpec extends NgcErrorItem {

    public constructor(
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
        serviceUrl: '_serviceUrl',
        project: '_project',
        version: '1',
        sessionId: 'someRandomIdentifier',
        maxQueue: 10,
        maxTimeout: 10,
        params: null,
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
        assert.isDefined(errorItem);
    });

    it('should return item', () => {
        errorItem = new NgcErrorItemSpec(errorData.type, errorData.module, config);
        assert.isDefined(errorItem.getItem());
    });

    it('should contain all other params', () => {
        errorItem = new NgcErrorItemSpec(errorData.type, errorData.module, config);
        assert.deepEqual(errorItem.getItem(), {
            type: errorData.type,
            module: errorData.module,
            project: config.project,
            version: config.version,
            sessionId: config.sessionId,
            params: config.params,
        });
    });

});
