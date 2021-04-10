import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgCatcherConfigService, NgCatcherModule } from '@public-js/ng-catcher';

import { AppComponent } from './app.component';


const ngCatcherConfig = (cs: NgCatcherConfigService): () => void => (): void =>
    cs.setConfig({
        serviceUrl: 'https://httpstat.us/200',
        project: 'ng-catcher-demo',
        version: '0.0',
        maxTimeout: 10,
        params: { someParam: 'random' },
    });

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgCatcherModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [NgCatcherConfigService],
            useFactory: ngCatcherConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
