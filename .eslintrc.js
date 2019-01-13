module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:import/warnings",
        "plugin:import/errors",
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    plugins: ["prettier", "import"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true
    },
    settings: {
        "import/resolver": {
            "babel-module": {},
            node: { extensions: [".js", ".jsx"] }
        }
    },
    globals: {
        shallow: true,
        render: true,
        mount: true
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                printWidth: 80,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: "all"
            }
        ],
        "linebreak-style": 0,
        "react/jsx-indent": [1, 4],
        "react/jsx-indent-props": [1, 4],
        "react/destructuring-assignment": [
            2,
            "always",
            {
                ignoreClassFields: true
            }
        ],
        "react/jsx-one-expression-per-line": [
            0,
            {
                allow: "single-child"
            }
        ],
        "no-console": 1,
        "no-debugger": 1,
        "no-var": 1,
        "no-trailing-spaces": 1,
        "eol-last": 0,
        "no-unused-vars": 1,
        "no-underscore-dangle": 1,
        "no-alert": 2,
        "no-lone-blocks": 1,
        "no-multiple-empty-lines": [
            1,
            {
                max: 1
            }
        ],
        "jsx-quotes": 1,
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: true
            }
        ],
        "react/display-name": [
            1,
            {
                ignoreTranspilerName: false
            }
        ],
        "react/forbid-prop-types": [
            1,
            {
                forbid: ["any"]
            }
        ],
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-curly-spacing": 1,
        "react/jsx-key": 1,
        "react/jsx-max-props-per-line": 1,
        "react/jsx-no-bind": 1,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-literals": 0,
        "react/jsx-no-undef": 1,
        "react/jsx-pascal-case": 1,
        "react/jsx-sort-props": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-danger": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 1,
        "react/no-multi-comp": 1,
        "react/no-set-state": 0,
        "react/no-unknown-property": 1,
        "react/prefer-es6-class": 1,
        "react/prop-types": 1,
        "react/react-in-jsx-scope": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": 1,
        "import/no-named-as-default": 0
    }
};
