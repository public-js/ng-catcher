import { TestBed } from '@angular/core/testing';

import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgCatcherConfigService } from './ng-catcher-config.service';


describe('NgCatcherConfigService', () => {
    const config: NgCatcherConfig = {
        serviceUrl: 'https://httpstat.us/200',
        project: 'ng-catcher-test',
        version: '0.0',
        sessionId: 'someRandomIdentifier',
        maxQueue: 1,
        maxTimeout: 5,
    };

    let ngCatcherConfigService: NgCatcherConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NgCatcherConfigService,
            ],
        });

        ngCatcherConfigService = TestBed.inject(NgCatcherConfigService);
    });

    it('should be initialized', () => {
        expect(ngCatcherConfigService).toBeTruthy();
    });

    it('should return null', () => {
        ngCatcherConfigService.getConfig$()
            .subscribe(value => expect(value).toBeNull());
    });

    it('should not throw error', () => {
        expect(() =>
            ngCatcherConfigService.setConfig(config)
        )
            .not.toThrow();
    });

    it('should return valid serviceUrl', () => {
        ngCatcherConfigService.setConfig(config);
        ngCatcherConfigService.getConfig$()
            .subscribe(value =>
                expect(value?.serviceUrl).toEqual(config.serviceUrl)
            );
    });
});
