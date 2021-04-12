import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { NgCatcherService } from './services/ng-catcher.service';
import { NgCatcherErrorService } from './services/ng-catcher-error.service';
import { NgCatcherHttpService } from './services/ng-catcher-http.service';
import { NG_CATCHER_SERVICE } from './services/tokens';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: NgCatcherErrorService,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NgCatcherHttpService,
            multi: true,
        },
        {
            provide: NG_CATCHER_SERVICE,
            useClass: NgCatcherService,
        },
    ],
})
export class NgCatcherModule {
}
