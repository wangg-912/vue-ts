module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-mixed-spaces-and-tabs': [2, false],//禁止混用tab和空格
    'linebreak-style': [0, 'windows'],//换行风格
    "no-extra-parens": 2,//禁止非必要的括号
    "no-extra-semi": 2,//禁止多余的冒号
    "quotes": [1, "single"],//引号类型 `` "" ''
    "quote-props": [2, "always"],//对象字面量中的属性名是否强制双引号
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
