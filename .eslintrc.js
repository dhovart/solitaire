module.exports = {
  "env": {
    "browser": true,
  },
  "extends": "airbnb",
  "plugins": [
      "react",
      "mocha"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};

