import { assert } from 'chai';
import 'mocha';

import { IErrorData } from '../interfaces/error-data';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorEvent } from './ngc-error-event.model';


describe('NgcErrorEvent', () => {

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

    let errorEvent: NgcErrorEvent | undefined;

    beforeEach(() => errorEvent = undefined);

    it('should be instantiated', () => {
        errorEvent = new NgcErrorEvent(errorData, config);
        assert.isDefined(errorEvent);
    });

    it('should return item', () => {
        errorEvent = new NgcErrorEvent(errorData, config);
        assert.isDefined(errorEvent.getItem());
    });

    it('should contain valid time', () => {
        errorEvent = new NgcErrorEvent(errorData, config);
        assert.match(errorEvent.getItem().time, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('should match passed time', () => {
        const now = new Date();
        errorEvent = new NgcErrorEvent(errorData, config, now);
        assert.strictEqual(errorEvent.getItem().time, now.toISOString());
    });

    it('should contain all other params', () => {
        const now = new Date();
        errorEvent = new NgcErrorEvent(errorData, config, now);
        assert.deepEqual(errorEvent.getItem(), {
            type: errorData.type,
            module: errorData.module,
            project: config.project,
            version: config.version,
            sessionId: config.sessionId,
            params: config.params,
            description: errorData.description,
            details: errorData.details,
            time: now.toISOString(),
        });
    });

});
