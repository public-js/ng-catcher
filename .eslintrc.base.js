module.exports = {
    root: true,
    extends: [
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'decorator-position',
        'import',
        'rxjs',
        'simple-import-sort',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['./node_modules/', './node_modules/@types'],
            },
        },
    },
    rules: {
        /** -------------------- TypeScript-ESLint: native -------------------- */
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/class-literal-property-style': 'off',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
        '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'as' }],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        '@typescript-eslint/explicit-member-accessibility': ['warn', {
            accessibility: 'explicit',
            overrides: { constructors: 'no-public' },
        }],
        '@typescript-eslint/explicit-module-boundary-types': ['warn'],
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false,
            },
        }],
        '@typescript-eslint/member-ordering': ['warn'],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/naming-convention': ['warn',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid',
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE', 'snake_case'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid',
            }],
        '@typescript-eslint/no-base-to-string': ['error'],
        '@typescript-eslint/no-confusing-non-null-assertion': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-interface': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': ['warn'],
        '@typescript-eslint/no-extraneous-class': 'off', // OOP-like
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-for-in-array': ['warn'],
        '@typescript-eslint/no-implicit-any-catch': 'off',
        '@typescript-eslint/no-implied-eval': ['error'],
        '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
        '@typescript-eslint/no-invalid-void-type': ['error'],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'off', // ?
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn', // 'off' for TS 3.9+
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-type-alias': 'off', // ?
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off', // ?
        '@typescript-eslint/no-unnecessary-condition': 'off', // throws error, check this
        '@typescript-eslint/no-unnecessary-qualifier': 'warn', // check this
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off', // fails for catching errors in observables
        '@typescript-eslint/no-unsafe-member-access': 'off', // fails for catching errors in observables
        '@typescript-eslint/no-unsafe-return': 'off', // ?
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'off', // ?
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn', // 'error' for TS 3.7+
        '@typescript-eslint/prefer-optional-chain': 'warn', // 'warn' for TS 3.7+
        '@typescript-eslint/prefer-readonly': 'off', // fails for constructor arguments
        '@typescript-eslint/prefer-readonly-parameter-types': 'off', // ?
        '@typescript-eslint/prefer-reduce-type-parameter': 'off', // ?,
        '@typescript-eslint/prefer-regexp-exec': 'off', // ?
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/promise-function-async': 'off', // fails for async taps in observables
        '@typescript-eslint/require-array-sort-compare': 'off',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'off', // ?
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'off', // fails for switching enums
        '@typescript-eslint/triple-slash-reference': 'off', // ?
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/unbound-method': ['warn', { ignoreStatic: true }], // check this
        '@typescript-eslint/unified-signatures': 'warn',
        /** -------------------- TypeScript-ESLint: extensions -------------------- */
        '@typescript-eslint/brace-style': ['error', '1tbs'],
        '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
        '@typescript-eslint/comma-spacing': ['error', {
            before: false,
            after: true,
        }],
        '@typescript-eslint/default-param-last': ['error'],
        // '@typescript-eslint/dot-notation': ['warn', { 'allowKeywords': true }],
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/indent': ['warn', 4, {
            VariableDeclarator: 'first',
            SwitchCase: 1,
        }],
        // '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/keyword-spacing': ['error', {
            before: true,
            after: true,
        }],
        // '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-array-constructor': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error'],
        '@typescript-eslint/no-duplicate-imports': ['warn', { includeExports: true }],
        '@typescript-eslint/no-empty-function': ['error', {
            allow: [
                'arrowFunctions',
                'private-constructors',
                'protected-constructors',
                'decoratedFunctions',
            ],
        }],
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-invalid-this': 'off', // causes error, check this
        '@typescript-eslint/no-loop-func': 'off', // ?
        '@typescript-eslint/no-loss-of-precision': ['error'],
        '@typescript-eslint/no-magic-numbers': 'off', //
        // ^ ['warn', { 'ignoreEnums': true, 'ignoreNumericLiteralTypes': true, 'ignoreReadonlyClassProperties': true }],
        '@typescript-eslint/no-redeclare': ['warn'],
        '@typescript-eslint/no-shadow': ['error', { hoist: 'all' }], // check this
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        // '@typescript-eslint/no-useless-constructor': ['warn'],
        '@typescript-eslint/quotes': ['error', 'single'],
        // '@typescript-eslint/require-await': 'error',
        // '@typescript-eslint/return-await': 'warn',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
        /** -------------------- ESLint plugin Decorator position -------------------- */
        'decorator-position/decorator-position': ['error', {
            properties: 'prefer-inline',
            methods: 'above',
        }],
        /** -------------------- ESLint plugin Import -------------------- */
        'import/newline-after-import': ['error', { count: 2 }],
        'import/no-deprecated': 'warn',
        'import/order': 'off',
        /** -------------------- ESLint plugin RxJS -------------------- */
        // 'rxjs/ban-observables': 'off',
        // 'rxjs/ban-operators': 'off',
        'rxjs/finnish': ['error', {
            functions: false,
            methods: false,
            parameters: true,
            properties: true,
            variables: true,
            names: { '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false },
            strict: true,
            types: { '^EventEmitter$': false },
        }],
        // 'rxjs/just': 'off',
        'rxjs/no-async-subscribe': 'error',
        'rxjs/no-compat': 'error',
        // 'rxjs/no-connectable': 'off',
        'rxjs/no-create': 'error',
        // 'rxjs/no-cyclic-action': ['error', { 'observable': '[Aa]ction(s|s\\$|\\$)$' }],
        // 'rxjs/no-explicit-generics': 'off',
        // 'rxjs/no-exposed-subjects': ['warn', { 'allowProtected': true }], // TODO: unsuitable for Angular?
        // 'rxjs/no-finnish': 'off',
        // 'rxjs/no-ignored-error': 'warn', // TODO: enable later
        'rxjs/no-ignored-notifier': 'error',
        'rxjs/no-ignored-observable': 'warn',
        'rxjs/no-ignored-replay-buffer': 'warn',
        // 'rxjs/no-ignored-subscribe': 'off',
        // 'rxjs/no-ignored-subscription': 'off',
        'rxjs/no-ignored-takewhile-value': 'error',
        // 'rxjs/no-implicit-any-catch': ['error', { 'allowExplicitAny': true }], // TODO: enable later
        'rxjs/no-index': 'error',
        'rxjs/no-internal': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-redundant-notify': 'error',
        'rxjs/no-sharereplay': ['warn', { allowConfig: true }],
        // 'rxjs/no-subclass': 'error',
        'rxjs/no-subject-unsubscribe': 'error',
        'rxjs/no-subject-value': 'error',
        'rxjs/no-topromise': 'warn',
        'rxjs/no-unbound-methods': 'warn',
        // 'rxjs/no-unsafe-catch': 'warn', // TODO: enable for NgRx
        // 'rxjs/no-unsafe-first': ['error', { 'observable': '[Aa]ction(s|s\\$|\\$)$' }], // TODO: enable for NgRx
        'rxjs/no-unsafe-subject-next': 'error', // TODO: enable for TS 3.7+
        // 'rxjs/no-unsafe-switchmap': 'off', // TODO: enable for NgRx + configuration
        'rxjs/no-unsafe-takeuntil': 'warn',
        // 'rxjs/prefer-observer': 'off',
        // 'rxjs/suffix-subjects': 'off',
        'rxjs/throw-error': 'off', // TODO: enable this ?
        /** -------------------- ESLint plugin Simple import sort -------------------- */
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': ['warn', {
            groups: [
                ['^(@angular|@ng-bootstrap|@ngrx)/.*', '^rxjs(/.*|$)'],
                ['^@public-js/.*'],
                // ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ],
        }],
        /** -------------------- ESLint: possible errors -------------------- */
        'no-cond-assign': ['error', 'except-parens'], // ['error', 'always'],
        'no-console': ['warn'],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-extra-parens': 'off', // see '@typescript-eslint/no-extra-parens'
        'no-extra-semi': 'off', // see '@typescript-eslint/no-extra-semi'
        'no-loss-of-precision': 'off', // see '@typescript-eslint/no-loss-of-precision'
        'no-unexpected-multiline': 'warn',
        /** -------------------- ESLint: best practices -------------------- */
        'curly': ['error', 'all'],
        'default-param-last': 'off', // see '@typescript-eslint/default-param-last'
        'dot-location': ['error', 'property'],
        // 'dot-notation': 'off', // see '@typescript-eslint/dot-notation'
        'eqeqeq': ['error', 'smart'],
        'guard-for-in': 'error',
        'no-caller': 'error',
        'no-empty-function': 'off', // see '@typescript-eslint/no-empty-function'
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-implied-eval': 'off', // see '@typescript-eslint/no-implied-eval'
        'no-invalid-this': 'off', // see '@typescript-eslint/no-invalid-this'
        'no-loop-func': 'off', // see '@typescript-eslint/no-loop-func'
        'no-magic-numbers': 'off', // see '@typescript-eslint/no-magic-numbers'
        'no-multi-spaces': 'warn',
        'no-new-wrappers': 'error',
        'no-redeclare': 'off', // see '@typescript-eslint/no-redeclare'
        // 'no-return-await': 'off', // see '@typescript-eslint/return-await'
        'no-self-assign': 'error', //
        'no-throw-literal': 'error',
        'no-unused-expressions': 'off', // see '@typescript-eslint/no-unused-expressions'
        'no-unused-labels': 'error',
        // 'no-useless-call': 'warn',
        'radix': 'error',
        // 'require-await': 'off', // see '@typescript-eslint/require-await'
        'wrap-iife': 'off',
        /** -------------------- ESLint: strict mode -------------------- */
        /** -------------------- ESLint: variables -------------------- */
        // 'init-declarations': 'off', // see '@typescript-eslint/init-declarations'
        'no-shadow': 'off', // see '@typescript-eslint/no-shadow'
        'no-undef-init': 'error',
        'no-unused-vars': 'off', // see '@typescript-eslint/no-unused-vars'
        'no-use-before-define': 'off', // see '@typescript-eslint/no-use-before-define'
        /** -------------------- ESLint: stylistic issues -------------------- */
        'array-bracket-newline': ['error', 'consistent'],
        'array-bracket-spacing': ['error', 'never'],
        'array-element-newline': ['error', 'consistent'],
        'block-spacing': ['error', 'always'],
        'brace-style': 'off', // see '@typescript-eslint/brace-style'
        'comma-dangle': 'off', // see '@typescript-eslint/comma-dangle'
        'comma-spacing': 'off', // see '@typescript-eslint/comma-spacing'
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'func-call-spacing': 'off', // see '@typescript-eslint/func-call-spacing'
        'function-call-argument-newline': ['warn', 'consistent'],
        'function-paren-newline': 'off', // ['error', 'consistent'],
        'id-match': 'off',
        'implicit-arrow-linebreak': 'off',
        'indent': 'off', // see '@typescript-eslint/indent'
        // 'jsx-quotes': 'off',
        'key-spacing': ['error', {
            beforeColon: false,
            afterColon: true,
            mode: 'strict',
        }],
        'keyword-spacing': 'off', // see '@typescript-eslint/keyword-spacing'
        'linebreak-style': ['error', 'unix'],
        'lines-around-comment': 'off',
        // 'lines-between-class-members': 'off', // see '@typescript-eslint/lines-between-class-members'
        'max-len': ['warn', { code: 140 }],
        'multiline-ternary': ['warn', 'always-multiline'], // error ?
        'new-parens': ['error', 'always'],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }], // 'off',
        'no-array-constructor': 'off', // see '@typescript-eslint/no-array-constructor'
        'no-bitwise': 'error',
        'no-mixed-operators': 'error',
        'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
        'no-multiple-empty-lines': 'off',
        'no-tabs': 'off', // ['error', { 'allowIndentationTabs': true }], // throws error for commented code
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'off',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': ['error', 'beside'],
        'object-curly-newline': ['error', { minProperties: 12, consistent: true }],
        'object-curly-spacing': ['error', 'always'],
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        'one-var-declaration-per-line': 'error', // ['error', 'initializations'], // 'off',
        'operator-assignment': ['warn', 'always'],
        'operator-linebreak': ['error', 'before', {
            overrides: {
                '=': 'after',
                '=>': 'after',
            },
        }],
        'padded-blocks': ['warn', {
            blocks: 'never',
            classes: 'always',
            switches: 'never',
        }],
        'quote-props': ['error', 'consistent-as-needed'],
        'quotes': 'off', // see '@typescript-eslint/quotes'
        'semi': 'off', // see '@typescript-eslint/semi'
        'semi-spacing': ['error', {
            before: false,
            after: true,
        }],
        'semi-style': 'off', //
        // 'sort-keys': ['warn', 'asc', { 'caseSensitive': false, 'natural': true }],
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off', // see '@typescript-eslint/space-before-function-paren'
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'off',
        'space-unary-ops': 'off', // ?
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'switch-colon-spacing': ['error', {
            after: true,
            before: false,
        }],
        'template-tag-spacing': ['error', 'always'],
        'unicode-bom': ['error', 'never'],
        'wrap-regex': 'off',
        /** -------------------- ESLint: ECMAScript 6 -------------------- */
        'arrow-body-style': 'error',
        'arrow-parens': ['warn', 'as-needed'],
        'arrow-spacing': ['error', {
            before: true,
            after: true,
        }],
        'constructor-super': 'error',
        'generator-star-spacing': ['error', {
            before: true,
            after: false,
        }],
        'no-class-assign': 'error',
        'no-confusing-arrow': 'off',
        'no-const-assign': 'error',
        'no-dupe-class-members': 'off', // see '@typescript-eslint/no-dupe-class-members'
        'no-duplicate-imports': 'off', // see '@typescript-eslint/no-duplicate-imports'
        // 'no-new-symbol': 'error',
        'no-restricted-imports': ['error', 'rxjs/Rx'],
        'no-this-before-super': 'error',
        // 'no-useless-computed-key': 'warn',
        // 'no-useless-constructor': 'off', // see '@typescript-eslint/no-useless-constructor'
        'no-useless-rename': ['error', {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
        }],
        'no-var': 'error',
        'object-shorthand': ['warn', 'properties'],
        'prefer-arrow-callback': 'off', // ?
        'prefer-const': 'error',
        // 'prefer-destructuring': ['error',
        // 	{ 'array': false, 'object': false },
        // 	{ 'enforceForRenamedProperties': false }
        // ],
        // 'prefer-numeric-literals': 'warn',
        // 'prefer-rest-params': 'warn',
        // 'prefer-spread': 'warn',
        'prefer-template': 'warn',
        // 'require-yield': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'sort-imports': 'off',
        // 'symbol-description': 'error',
        'template-curly-spacing': ['warn', 'never'],
        'yield-star-spacing': ['error', {
            before: true,
            after: false,
        }],
    },
};
