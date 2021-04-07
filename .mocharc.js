module.exports = {
    'extension': ['ts'],
    'spec': [
        'src/**/*.spec.[jt]s?(x)',
        // 'tests/**/*.spec.[jt]s?(x)',
        'projects/public-js/ng-catcher/src/**/*.spec.[jt]s?(x)',
        // 'projects/public-js/ng-catcher/tests/**/*.spec.[jt]s?(x)',
    ],
    'require': 'ts-node/register',
};
