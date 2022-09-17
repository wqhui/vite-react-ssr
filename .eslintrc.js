module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended', // 使用 @eslint-plugin-react 的推荐规则
    'plugin:react-hooks/recommended', // 使用 @eslint-plugin-react-hooks 的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用 @typescript-eslint/eslint-plugin 的推荐规则
    'prettier', // 使用 prettier 规则， 禁用来自 @typescript-eslint/eslint-plugin 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended', //使用 @eslint-plugin-prettier 的推荐规则
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // override/add rules settings here, such as:
  },
}
