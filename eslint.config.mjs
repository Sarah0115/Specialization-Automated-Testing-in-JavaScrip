import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import css from '@eslint/css';
import prettier from 'eslint-config-prettier'; // asegúrate de tenerlo instalado

export default [
    {
        files: ['**/*.{js,mjs,cjs}'],
        ignores: [
            'node_modules',
            'reports',
            'screenshots',
            'dist',
            'package.json',
            'package-lock.json',
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.mocha,
                browser: true,
                $: true,
                $$: true,
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },

    js.configs.recommended,
    prettier,

    {
        files: ['**/*.json'],
        ...json.configs.recommended,
        ignores: [
            'node_modules',
            'reports',
            'screenshots',
            'dist',
            'package.json',
            'package-lock.json',
        ],
    },

    {
        files: ['**/*.css'],
        ...css.configs.recommended,
    },
];
