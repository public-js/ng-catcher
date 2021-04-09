import { IErrorData } from '../interfaces/error-data';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorEvent } from './ngc-error-event.model';


describe('NgcErrorEvent', () => {

    const config: Required<NgCatcherConfig> = {
        serviceUrl: 'https://httpstat.us/200',
        project: 'ng-catcher-test',
        version: '0.0',
        sessionId: 'someRandomIdentifier',
        maxQueue: 1,
        maxTimeout: 5,
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
        expect(errorEvent).toBeDefined();
    });

    it('should return item', () => {
        errorEvent = new NgcErrorEvent(errorData, config);
        expect(errorEvent.getItem()).toBeDefined();
    });

    it('should contain valid time', () => {
        errorEvent = new NgcErrorEvent(errorData, config);
        expect(errorEvent.getItem().time).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('should match passed time', () => {
        const now = new Date();
        errorEvent = new NgcErrorEvent(errorData, config, now);
        expect(errorEvent.getItem().time).toBe(now.toISOString());
    });

    it('should contain all other params', () => {
        const now = new Date();
        errorEvent = new NgcErrorEvent(errorData, config, now);
        expect(errorEvent.getItem()).toEqual( {
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
