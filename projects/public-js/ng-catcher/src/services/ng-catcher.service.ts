import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, delay, exhaustMap, filter, first, mapTo, retryWhen, scan, take, tap } from 'rxjs/operators';

import { IErrorItem } from '../interfaces/error-item';
import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { NgCatcherConfigService } from './ng-catcher-config.service';

@Injectable({ providedIn: 'root' })
export class NgCatcherService implements OnDestroy {

    private queue: IErrorItem[] = [];
    private timer: any;
    private send$: Subject<Required<NgCatcherConfig>> = new Subject<Required<NgCatcherConfig>>();

    private timeout = 15000;
    private config: Required<NgCatcherConfig> | null = null;

    private noRetry = false;
    private noRetry$: Subject<IErrorItem[]> = new Subject<IErrorItem[]>();

    constructor(
        private configService: NgCatcherConfigService,
        private httpClient: HttpClient,
        private ngZone: NgZone,
    ) {
        this.configService.getConfig$()
            .pipe(
                filter(<Conf = Required<NgCatcherConfig>>(config: Conf | null): config is Conf => config !== null),
                take(1),
                tap((config: Required<NgCatcherConfig>) => {
                    this.config = config;
                    this.timeout = config.maxTimeout * 1000;
                })
            )
            .subscribe();

        this.send$
            .pipe(
                filter((config: Required<NgCatcherConfig>) => Boolean(config)),
                exhaustMap((config: Required<NgCatcherConfig>) =>
                    this.send(config, this.queue.slice(0, config.maxQueue))
                        .pipe(
                            retryWhen((errors$: Observable<any>) =>
                                errors$
                                    .pipe(
                                        scan((tries: number) => tries + 1, 0),
                                        tap((tries: number) => {
                                            if (tries >= config.retryMax) {
                                                this.noRetry = tries >= config.retryMax;
                                                this.noRetry$.next(this.queue);
                                                clearTimeout(this.timer);
                                            }
                                        }),
                                        delay(config.retryTimeout * 1000),
                                    )
                            ),
                            tap((success: boolean) => success && this.queue.splice(0, config.maxQueue)),
                            tap(() => this.resetTimer()),
                        )
                ),
            )
            .subscribe();
    }

    public push(event: IErrorItem): void {
        this.queue.push(event);
        this.trySend();
    }

    public get stoppedTrying$(): Observable<IErrorItem[]> {
        return this.noRetry$.asObservable();
    }

    public ngOnDestroy(): void {
        this.send$.complete();
        this.noRetry$.complete();
        clearTimeout(this.timer);
    }

    private trySend(onTimer: boolean = false): void {
        if (this.config && this.queue.length > 0 && !this.noRetry) {
            if (this.queue.length >= this.config.maxQueue || onTimer) {
                this.send$.next(this.config);
            } else {
                this.resetTimer();
            }
        }
    }

    private send(config: NgCatcherConfig, batch: IErrorItem[]): Observable<boolean> {
        return batch.length > 0
            ? this.httpClient.post(config.serviceUrl, batch)
                .pipe(
                    first(),
                    mapTo(true),
                    catchError(() => of(false)),
                )
            : of(false);
    }

    private resetTimer(): void {
        clearTimeout(this.timer);
        this.ngZone.runOutsideAngular(() => {
            this.timer = setTimeout(() => {
                this.trySend(true);
            }, this.timeout);
        });
    }

}
