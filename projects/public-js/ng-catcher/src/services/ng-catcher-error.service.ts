import { Injectable, ErrorHandler, NgZone, Inject } from '@angular/core';
import { filter, take, tap } from 'rxjs/operators';

import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorEvent } from '../models/ngc-error-event.model';
import { NgCatcherConfigService } from './ng-catcher-config.service';
import { NgCatcherService } from './ng-catcher.service';
import { NG_CATCHER_SERVICE_TOKEN } from './tokens';

@Injectable({ providedIn: 'root' })
export class NgCatcherErrorService implements ErrorHandler {

    private static readonly EVENT_TYPE = 'client';
    private static readonly EVENT_MODULE = null;

    private queue: { error: any; time: Date }[] = [];
    private timer: any;

    private config: Required<NgCatcherConfig> | null = null;

    public constructor(
        @Inject(NG_CATCHER_SERVICE_TOKEN) private ngCatcherService: NgCatcherService,
        private configService: NgCatcherConfigService,
        private ngZone: NgZone,
    ) {
        this.configService.getConfig$()
            .pipe(
                filter(<Conf = Required<NgCatcherConfig>>(config: Conf | null): config is Conf => config !== null),
                take(1),
                tap((config: Required<NgCatcherConfig>) => this.config = config)
            )
            .subscribe();
    }

    private static reportError(config: Required<NgCatcherConfig>, error: any, time?: Date): IErrorItem {
        return new NgcErrorEvent({
                type: NgCatcherErrorService.EVENT_TYPE,
                module: NgCatcherErrorService.EVENT_MODULE,
                description: null,
                details: {
                    error,
                    name: error.name || undefined,
                    message: error.message || undefined,
                    stack: error.stack || undefined,
                },
            },
            config,
            time,
        ).getItem();
    }

    public handleError(error: any): void {
        this.ngZone.run(() => this.tryPush(error));
    }

    private tryPush(error: any, onTimer: boolean = false): void {
        if (error) {
            if (this.config) {
                this.ngCatcherService.push(NgCatcherErrorService.reportError(this.config, error));
            } else {
                this.queue.push({ error, time: new Date() });
            }
        }
        if (onTimer) {
            this.config ? this.dequeue(this.config) : this.resetTimer();
        }
    }

    private dequeue(config: Required<NgCatcherConfig>): void {
        this.queue.forEach((item: { error: any; time: Date }) => {
            this.ngCatcherService.push(NgCatcherErrorService.reportError(config, item.error, item.time));
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
