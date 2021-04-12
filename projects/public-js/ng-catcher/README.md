# @public-js/ng-catcher

[![CI](https://img.shields.io/github/workflow/status/public-js/ng-catcher/CI?style=flat)](https://github.com/public-js/ng-catcher/actions?query=workflow%3ACI)
[![Version](https://img.shields.io/npm/v/@public-js/ng-catcher?style=flat)](https://www.npmjs.com/package/@public-js/ng-catcher)
[![License](https://img.shields.io/npm/l/@public-js/ng-catcher?style=flat)](https://www.npmjs.com/package/@public-js/ng-catcher)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b676cb7041974c45818309851cb043f6)](https://www.codacy.com/gh/public-js/ng-catcher/dashboard)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/public-js/ng-catcher.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/public-js/ng-catcher/context:javascript)
[![codecov](https://codecov.io/gh/public-js/ng-catcher/branch/main/graph/badge.svg?token=NBALZKTFJR)](https://codecov.io/gh/public-js/ng-catcher)
[![Maintainability](https://api.codeclimate.com/v1/badges/290f2cb87329f90e139c/maintainability)](https://codeclimate.com/github/public-js/ng-catcher/maintainability)

---

NgCatcher provides a comfortable way to catch errors in Angular apps.


* [Getting started](#getting-started)
* [Backend requirements](#backend-requirements)
* [Configuration](#configuration)
    * [Basic config](#basic-config)
    * [Advanced config](#advanced-config)
* [Need some help?](#need-some-help)


## Getting started

Add NgCatcher to your project by running:
```shell
npm i @public-js/ng-catcher
```

Then set it up in the `app.module.ts`. Here's the minimal config:
```typescript
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgCatcherConfigService, NgCatcherModule } from '@public-js/ng-catcher';

const ngCatcherConfig = (cs: NgCatcherConfigService): () => void => () =>
    cs.setConfig({
        serviceUrl: '',
        project: '',
        version: '',
    });

@NgModule({
    // declarations: [...],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgCatcherModule,
        // ...
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [NgCatcherConfigService],
            useFactory: ngCatcherConfig,
        },
        // ...
    ],
    // bootstrap: [...],
})
export class AppModule {
}
```


## Backend requirements

By default, NgCatcher sends a POST request to the given `serviceUrl` in the following format:
```json
[
    {
        "type": "client",
        "module": null,
        "project": "project-name",
        "version": "project-version",
        "sessionId": "random-guid",
        "params": null,
        "description": null,
        "details": {},
        "time": "ISO-formatted-date-time"
    }
]
```

Your backend engine should be able to receive these data arrays and put them into your database, log file or somewhere else.

As long as the time required for different errors to be processed by Angular may vary, it's not guaranteed that errors would be saved and reported sorted by time.
Which means, you might want to use the time parameter to be a part of your table primary key.


## Configuration

One of the NgCatcher's key features is flexibility.
You've seen only the minimal config in the Getting started section but there are much more options to make it your favorite Angular module.

### Basic config

To start using the module you need to provide a `NgCatcherConfig` object to the `NgCatcherConfigService`:

```typescript
interface NgCatcherConfig {
    serviceUrl: string;
    project: string;
    version: string;
    sessionId?: string;
    maxQueue?: number;
    maxTimeout?: number;
    retryMax?: number;
    retryTimeout?: number;
    params?: Params;
}
```

* `serviceUrl` – Backend endpoint
* `project` – App name
* `version` – Current app version
* `sessionId` – Some identifier to distinguish reports (if none provided, we'll take care of it by creating a pseudo-random GUID)
* `maxQueue` – Max amount of items in the queue (`10` by default)
* `maxTimeout` – Max amount of time (in seconds) for the queue (`15` by default)
* `retryMax` – Max amount of attempts to report the same batch of items (`5` by default)
* `retryTimeout` – Max amount of time (in seconds) between attempts (`15` by default)
* `params` – Your own generic params to be sent with each item

`NgCatcherService` will accumulate all the errors within your app and store them in the queue.
When the queue size reaches the `maxQueue` size or the `maxTimeout` seconds are passed since last caught error, it will attempt to report up to `maxQueue` items.


### Advanced config

As shown in the demo app (see `src/app.module.ts`), for a quick start you could just import the `NgCatcherModule` and you're good to go.
There's also an option to add the catching services you need to the `providers` section in your modules.
By doing that or by lazy loading your modules you're also able to inject a value for the `NG_CATCHER_SRC_MODULE` token which could help you identify the source of the error much faster.

Also, you could dive a lot deeper.
As long as you're not satisfied with the default catchers or even the core service, you have at least several options:
* Replace them utilizing Angular DI
* Create a feature request
* Fork the repo then create a PR

Just make sure that if you choose to contribute to NgCatcher, your proposed changes are flexible enough to be reused without completely rewriting dependent projects.


## Need some help?

If you experience any troubles setting up this module, you may refer to the `src/app/app.module.ts` file within this repo.
For everything else feel free to create an issue (don't forget to check if anyone's asked the same).
