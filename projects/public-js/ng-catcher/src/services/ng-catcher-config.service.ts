import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { NgCatcherConfig } from '../interfaces/ng-catcher-config';
import { Guid } from './guid';

@Injectable({ providedIn: 'root' })
export class NgCatcherConfigService {

    private config$: ReplaySubject<Required<NgCatcherConfig> | null> =
        new ReplaySubject<Required<NgCatcherConfig> | null>(1);

    constructor() {
        this.config$.next(null);
    }

    public setConfig(config: NgCatcherConfig): void {
        this.config$.next({
            ...config,
            sessionId: config.sessionId || Guid.generate(),
            maxQueue: config.maxQueue || 10,
            maxTimeout: config.maxTimeout || 15,
            params: config.params || null,
        });
    }

    /**
     * Returns global Catcher config
     */
    public getConfig$(): Observable<Required<NgCatcherConfig> | null> {
        return this.config$.asObservable();
    }

}
