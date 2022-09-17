module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'comment-empty-line-before': null,
    'function-name-case': ['lower'],
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'color-hex-length': null,
  },
  overrides: [
    {
      files: ['**/*.{css,less}'],
      customSyntax: 'postcss-less',
    },
  ],
  ignoreFiles: [],
}
