module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'body-leading-blank': [2, 'never'],
        'body-max-line-length': [2, 'always', 100],
        'header-full-stop': [2, 'never', '.'],
        'header-max-length': [2, 'always', 100],
        'scope-case': [
            2,
            'always',
            ['lowercase', 'kebab-case', 'pascal-case'],
        ],
        'scope-empty': [2, 'never'],
        'scope-max-length': [2, 'always', 20],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
        ],
    },
};
