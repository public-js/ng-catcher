import { InjectionToken } from '@angular/core';

import { NgCatcherService } from './ng-catcher.service';


export const NG_CATCHER_SERVICE_TOKEN: InjectionToken<NgCatcherService> =
    new InjectionToken('_NG_CATCHER_SERVICE_TOKEN');
