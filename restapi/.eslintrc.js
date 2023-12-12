module.exports = {
    "plugins": [
        "react"
    ],
		"settings": {
			"react": {
				"version": "16.5",
			}
		},
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
        "es6": true
    },
    "rules": {
        // babel-eslint
				"strict": 0,
        // enable additional rules
        "indent": ["error", 2],
        "linebreak-style": ["error", "windows"],
        // "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        // "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
				"no-unused-vars": "off",
        "linebreak-style": [2, "windows"],

        // ES2015
        "arrow-parens": 0,
        "arrow-spacing": [2, { "before": true, "after": true }],
        "constructor-super": 2,
        "no-class-assign": 2,
        "no-const-assign": 2,
        "no-this-before-super": 0,
        "no-var": 2,
        "object-shorthand": [2, "always"],
        "prefer-arrow-callback": 2,
        "prefer-const": 2,
        "prefer-spread": 2,
        "prefer-template": 2,

        // Stylistic
        "max-len": [2, 135, 4, {
            "ignoreUrls": true,
            "ignoreComments": false,
            "ignorePattern": "^\\s*(const|let|var)\\s+\\w+\\s+\\=\\s+\\/.*\\/(|i|g|m|ig|im|gm|igm);?$"
        }],
        "no-trailing-spaces": 2,
        "no-unneeded-ternary": 2,
        "spaced-comment": [2, "always", {
            "exceptions": ["-", "+"],
            "markers": ["=", "!"]
        }],

        // React
        "react/jsx-indent": [2, 2],
    }
}