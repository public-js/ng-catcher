# @public-js/ng-catcher

[![CI](https://img.shields.io/github/workflow/status/public-js/ng-catcher/CI?style=flat)](https://github.com/public-js/ng-catcher/actions?query=workflow%3ACI)
[![Version](https://img.shields.io/npm/v/@public-js/ng-catcher?style=flat)](https://www.npmjs.com/package/@public-js/ng-catcher)
[![License](https://img.shields.io/npm/l/@public-js/ng-catcher?style=flat)](https://www.npmjs.com/package/@public-js/ng-catcher)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b676cb7041974c45818309851cb043f6)](https://www.codacy.com/gh/public-js/ng-catcher/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/290f2cb87329f90e139c/maintainability)](https://codeclimate.com/github/public-js/ng-catcher/maintainability)

---

NgCatcher provides a comfortable way to catch errors in Angular apps.


## Getting Started

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

If you experience any troubles with the initial configuration, you may refer to the `src/app/app/module.ts` file within this repo.
