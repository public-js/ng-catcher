import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { filter, take } from 'rxjs/operators';

import { IErrorData } from '../interfaces/error-data';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorEvent } from '../models/ngc-error-event.model';
import { NgCatcherService } from './ng-catcher.service';
import { NgCatcherConfigService } from './ng-catcher-config.service';


describe('NgCatcherService', () => {
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

    let httpTestingController: HttpTestingController;
    let ngCatcherConfigService: NgCatcherConfigService;
    let ngCatcherService: NgCatcherService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                NgCatcherConfigService,
                NgCatcherService,
            ],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        ngCatcherConfigService = TestBed.inject(NgCatcherConfigService);
        TestBed.inject(NgZone);
        ngCatcherService = TestBed.inject(NgCatcherService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be initialized', () => {
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
        ngCatcherConfigService.setConfig({ ...config, maxQueue: 2 });
    });

    it('should post 2 logs at once', () => {
        const errorItem = new NgcErrorEvent(errorData, config).getItem();

        ngCatcherConfigService.getConfig$()
            .pipe(
                filter(conf => conf !== null),
                take(1),
            )
            .subscribe(() => {
                ngCatcherService.push(errorItem);
                ngCatcherService.push(errorItem);

                const testRequest = httpTestingController.expectOne(config.serviceUrl);
                testRequest.flush(null, { status: 200, statusText: 'OK' });
                ngCatcherService.ngOnDestroy();

                expect(testRequest.request.method).toBe('POST');
                expect(testRequest.request.body).toEqual([errorItem, errorItem]);
            });
        ngCatcherConfigService.setConfig({ ...config, maxQueue: 2 });
    });

    // it('should fail to post 1 log', () => {
    //     const errorItem = new NgcErrorEvent(errorData, config).getItem();
    //
    //     ngCatcherConfigService.getConfig$()
    //         .pipe(
    //             filter(conf => conf !== null),
    //             take(1),
    //         )
    //         .subscribe(() => {
    //             ngCatcherService.push(errorItem);
    //
    //             const testRequest = httpTestingController.expectOne(config.serviceUrl);
    //             testRequest.error(new ErrorEvent('Error'), { status: 500, statusText: 'Error' });
    //             ngCatcherService.ngOnDestroy();
    //
    //             expect(testRequest.request.method).toBe('POST');
    //             expect(testRequest.request.body).toEqual([errorItem]);
    //         });
    //     ngCatcherConfigService.setConfig(config);
    // });
});
