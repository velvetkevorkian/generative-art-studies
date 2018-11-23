module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true
    },
    'extends': [
      'eslint:recommended'
    ],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'semi': ['warn', 'never'],
      'no-unused-vars': 'warn',
      'indent': ['warn', 2],
      'quotes': ['warn', 'single', {
        'allowTemplateLiterals': true,
        'avoidEscape': true
      }],
      'no-empty': 'warn'
  
    },
    parserOptions: {
      'ecmaVersion': 6,
      'sourceType': 'module'
    }
  }
  