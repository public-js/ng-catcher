import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { filter, take } from 'rxjs/operators';

import { NgcErrorEvent } from '../models/ngc-error-event.model';
import { IErrorData } from '../interfaces/error-data';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgCatcherConfigService } from './ng-catcher-config.service';
import { NgCatcherService } from './ng-catcher.service';


describe('NgCatcherService', () => {

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

    let ngCatcherService: NgCatcherService;
    let httpTestingController: HttpTestingController;
    let ngCatcherConfigService: NgCatcherConfigService;
    let ngZone: NgZone;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NgCatcherConfigService, NgCatcherService],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        ngCatcherConfigService = TestBed.inject(NgCatcherConfigService);
        ngZone = TestBed.inject(NgZone);
        ngCatcherService = TestBed.inject(NgCatcherService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be initialized', () => {
        expect(ngCatcherService).toBeDefined();
        expect(ngCatcherService).toBeTruthy();
    });

    it('should not post any logs', () => {
        const errorItem = new NgcErrorEvent(errorData, config).getItem();

        ngCatcherService.push(errorItem);
        httpTestingController.expectNone(config.serviceUrl);
    });

    it('should post 1 log immediately', () => {
        const errorItem = new NgcErrorEvent(errorData, config).getItem();

        ngCatcherConfigService.getConfig$()
            .pipe(
                filter(conf => conf !== null),
                take(1),
            )
            .subscribe(() => {
                ngCatcherService.push(errorItem);

                const testRequest = httpTestingController.expectOne(config.serviceUrl);
                testRequest.flush(null, { status: 200, statusText: 'OK' });
                ngCatcherService.ngOnDestroy();

                expect(testRequest.request.method).toBe('POST');
                expect(testRequest.request.body).toEqual([errorItem]);
            });
        ngCatcherConfigService.setConfig(config);
    });

    it('should post 1 log after 5 seconds', () => {
        const errorItem = new NgcErrorEvent(errorData, config).getItem();

        ngCatcherConfigService.getConfig$()
            .pipe(
                filter(conf => conf !== null),
                take(1),
            )
            .subscribe(fakeAsync(() => {
                ngCatcherService.push(errorItem);
                tick(5200);

                const testRequest = httpTestingController.expectOne(config.serviceUrl);
                testRequest.flush(null, { status: 200, statusText: 'OK' });
                ngCatcherService.ngOnDestroy();

                expect(testRequest.request.method).toBe('POST');
                expect(testRequest.request.body).toEqual([errorItem]);
            }));
        ngCatcherConfigService.setConfig(config);
    });

});
