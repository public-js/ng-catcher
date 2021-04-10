module.exports = {
    extends: ['./.eslintrc.base.js'],
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
    },
    rules: {},
};
