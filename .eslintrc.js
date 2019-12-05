module.exports = {
  "env": {
      "node": true,
      "browser": true, // for predefined globals
      "es6": true, // enables es6 features
      "jest": true,
  },
  "extends": "airbnb",
  "rules": {
      // Buffer uses constructor: `new Buffer.from(...)`
     "new-cap": "off",

      // Database references are done w/underscore notation
      "camelcase": "off",

      // Rejects returning a {success: false} object are acceptable
      "prefer-promise-reject-errors": "off",

      // Low-scope helpers defined within a class is acceptable
      "class-methods-use-this": "off",

      // Styles defined at bottom of file is clean
      "no-use-before-define": ["error", { "variables": false }],

      // Parenthesizing is preferred, just turning this off to reduce clutter
      "no-mixed-operators": "off",

      // In some cases, giving control to the function rather than the caller can be useful
      "no-param-reassign": "off",

      // When checking if null, abstract equality can actually be better, also some apis use strings for numbers
      "eqeqeq": "off",

      // No alternative logger added yet
      "no-console": "off",

      // Alerts are ok
      "no-alert": "off",

      // Object provides flexible style typing
      "react/forbid-prop-types": [1, {"forbid": ['object', 'array']}],

      "jsx-a11y/label-has-for":[ 2, { "required": { "some": [ "nesting", "id" ]} }], // Requires either linked id or wrapped label, not both
      "no-restricted-globals":"off",
      "no-control-regex":"off",
      "no-loop-func":"off",
      "no-underscore-dangle":"off",
      "jsx-a11y/click-events-have-key-events":"off",
      "jsx-a11y/no-static-element-interactions":"off",
      "jsx-a11y/no-noninteractive-element-interactions":"off",
      "jsx-a11y/control-has-associated-label":"off",
      "react/jsx-fragments":"off",
      "react/jsx-curly-newline":"off",
      "react/state-in-constructor":"off",
      "react/static-property-placement":"off",
      "react/jsx-props-no-spreading":"off",
      "no-multi-assign":"off",
      "react/no-unescaped-entities":"off",
      "react/no-multi-comp": "off",
      "react/jsx-filename-extension": "off",
      "global-require":"off",
      "import/no-dynamic-require":"off",
      "import/no-extraneous-dependencies":"off",
      "linebreak-style": 0,
      "no-bitwise":"off",
      "import/no-cycle":"off",
      "no-async-promise-executor":"off",
      "arrow-parens":"off",
  }
};
