module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'airbnb-base',
  ],

  rules: {
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': [2, { allow: ['_id', '_doc'] }],
  },
};
