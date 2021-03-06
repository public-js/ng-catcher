/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-jasmine'),
            require('karma-spec-reporter'),
        ],
        reporters: ['coverage', 'spec'],
        client: {
            clearContext: false,
            jasmine: {
                random: false,
            },
        },
        exclude: ['src/test.ts'],
        coverageReporter: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            dir: require('path').join(__dirname, '../../../coverage/ng-catcher'),
            reporters: [
                { type: 'lcovonly', subdir: '.' },
                { type: 'cobertura', subdir: '.' },
            ],
        },
        specReporter: {
            maxLogLines: 5,
            suppressErrorSummary: true,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: true,
            showSpecTiming: false,
            failFast: true,
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
    });
};
