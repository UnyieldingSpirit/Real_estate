module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'prettier',
  ],
  ignorePatterns: [
    'node_modules',
    '.next',
    'out',
    'public',
    'build',
    'dist',
    '.yarn',
    '*.d.ts',
    '*.config.js',
    'next-env.d.ts',
  ],
  rules: {
    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-max-props-per-line': ['warn', { maximum: 2, when: 'multiline' }],
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],
    'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-wrap-multilines': ['warn', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],

    // TypeScript
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // Импорты
    'import/order': ['warn', {
      'groups': [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],
        'index',
        'object',
        'type',
      ],
      'newlines-between': 'always',
      'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
    }],
    'import/newline-after-import': ['warn', { 'count': 1 }],

    // Стиль и форматирование
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'semi': ['warn', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'object-curly-newline': ['warn', {
      'ObjectExpression': { 'multiline': true, 'minProperties': 3 },
      'ObjectPattern': { 'multiline': true, 'minProperties': 3 },
      'ImportDeclaration': { 'multiline': true, 'minProperties': 3 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 3 },
    }],
    'object-property-newline': ['warn', { 'allowAllPropertiesOnSameLine': false }],
    'max-len': ['warn', {
      'code': 80,
      'tabWidth': 2,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    }],
    'function-paren-newline': ['warn', 'multiline'],
    'array-bracket-newline': ['warn', { 'multiline': true }],
    'array-element-newline': ['warn', 'consistent'],

    // Лучшие практики
    'no-console': ['warn', { 'allow': ['warn', 'error'] }],
    'prefer-const': 'warn',
    'eqeqeq': 'warn',
    'curly': ['warn', 'all'],
    'brace-style': ['warn', '1tbs'],
    'no-var': 'warn',
  },
  settings: {
    'react': {
      'version': 'detect',
    },
    'import/resolver': {
      'typescript': {}, // Для корректного разрешения путей в TypeScript
    },
  },
};