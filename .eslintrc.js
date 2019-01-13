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
        sourceType: "module"
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
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: true
            }
        ],
        "import/no-named-as-default": 0
    }
};
