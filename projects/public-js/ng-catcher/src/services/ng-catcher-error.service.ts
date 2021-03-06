import { ErrorHandler, Inject, Injectable, NgZone, Optional } from '@angular/core';
import { filter, take, tap } from 'rxjs/operators';

import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgcErrorEvent } from '../models/ngc-error-event.model';
import { NgCatcherService } from './ng-catcher.service';
import { NgCatcherConfigService } from './ng-catcher-config.service';
import { NG_CATCHER_SERVICE, NG_CATCHER_SRC_MODULE } from './tokens';

@Injectable({ providedIn: 'root' })
export class NgCatcherErrorService implements ErrorHandler {

    private static readonly eventType = 'client';

    private queue: { error: any; time: Date }[] = [];
    private timer: any;

    private config: Required<NgCatcherConfig> | null = null;

    constructor(
        @Inject(NG_CATCHER_SERVICE) private ngCatcherService: NgCatcherService,
        @Inject(NG_CATCHER_SRC_MODULE) @Optional() private srcModule: string | null,
        private configService: NgCatcherConfigService,
        private ngZone: NgZone,
    ) {
        this.configService.getConfig$()
            .pipe(
                filter(<Conf = Required<NgCatcherConfig>>(config: Conf | null): config is Conf => config !== null),
                take(1),
                tap((config: Required<NgCatcherConfig>) => {
                    this.config = config;
                    this.dequeue(config);
                })
            )
            .subscribe();
    }

    public handleError(error: Error | any): void {
        this.ngZone.run(() => this.tryPush(error));
    }

    private reportError(config: Required<NgCatcherConfig>, error: Error | any, time?: Date): IErrorItem {
        return new NgcErrorEvent({
            type: NgCatcherErrorService.eventType,
            module: this.srcModule ?? null,
            description: null,
            details: {
                error,
                name: error?.name,
                message: error?.message,
                stack: error?.stack,
            },
        }, config, time).getItem();
    }

    private tryPush(error: Error | any, onTimer: boolean = false): void {
        if (error) {
            if (this.config) {
                this.ngCatcherService.push(this.reportError(this.config, error));
            } else {
                this.queue.push({ error, time: new Date() });
                this.resetTimer();
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
        clearTimeout(this.timer);
        this.queue.forEach((item: { error: any; time: Date }) => {
            this.ngCatcherService.push(this.reportError(config, item.error, item.time));
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
