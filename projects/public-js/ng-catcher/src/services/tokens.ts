import { InjectionToken } from '@angular/core';

import { NgCatcherService } from './ng-catcher.service';


export const NG_CATCHER_SERVICE: InjectionToken<NgCatcherService> =
    new InjectionToken('NG_CATCHER_SERVICE');

export const NG_CATCHER_SRC_MODULE: InjectionToken<string> =
    new InjectionToken<string>('NG_CATCHER_SRC_MODULE');
