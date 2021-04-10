import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';

import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorEvent } from '../models/ngc-error-event.model';
import { NgCatcherService } from './ng-catcher.service';
import { NgCatcherConfigService } from './ng-catcher-config.service';
import { NG_CATCHER_SERVICE_TOKEN } from './tokens';

@Injectable({ providedIn: 'root' })
export class NgCatcherHttpService implements HttpInterceptor {

    private static readonly eventType = 'http';
    private static readonly eventModule = null;

    private queue: { error: HttpErrorResponse; time: Date }[] = [];
    private timer: any;

    private config: Required<NgCatcherConfig> | null = null;

    constructor(
        @Inject(NG_CATCHER_SERVICE_TOKEN) private ngCatcherService: NgCatcherService,
        private configService: NgCatcherConfigService,
        private ngZone: NgZone,
    ) {
        this.configService.getConfig$()
            .pipe(
                filter(<Conf = Required<NgCatcherConfig>>(config: Conf | null): config is Conf => config !== null),
                take(1),
                tap((config: Required<NgCatcherConfig>) => this.config = config),
            )
            .subscribe();
    }

    private static reportError(config: Required<NgCatcherConfig>, error: HttpErrorResponse, time?: Date): IErrorItem {
        return new NgcErrorEvent({
            type: NgCatcherHttpService.eventType,
            module: NgCatcherHttpService.eventModule,
            description: null,
            details: {
                url: error.url ?? '',
                message: error.message,
                status: error.status,
                statusText: error.statusText,
                error: typeof error.error === 'object'
                    ? JSON.stringify(error.error)
                    : error.error,
            },
        }, config, time).getItem();
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(this.config?.serviceUrl || '')) {
            return next.handle(req);
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.tryPush(error);
                    return throwError(error);
                }),
            );
    }

    private tryPush(error: HttpErrorResponse | null, onTimer: boolean = false): void {
        if (error) {
            if (this.config) {
                this.ngCatcherService.push(NgCatcherHttpService.reportError(this.config, error));
            } else {
                this.queue.push({ error, time: new Date() });
            }
        }
        if (onTimer) {
            if (this.config) {
                this.dequeue(this.config);
            } else {
                this.resetTimer();
            }
        }
    }

    private dequeue(config: Required<NgCatcherConfig>): void {
        this.queue.forEach((item: { error: any; time: Date }) => {
            this.ngCatcherService.push(NgCatcherHttpService.reportError(config, item.error, item.time));
        });
        this.queue = [];
    }

    private resetTimer(): void {
        clearTimeout(this.timer);
        this.ngZone.runOutsideAngular(() => {
            this.timer = setTimeout(() => {
                this.tryPush(null, true);
            }, 15000);
        });
    }

}
