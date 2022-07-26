module.exports = {
  root: true,
  extends: [
    'devextreme/typescript',
    'devextreme/javascript',
    'devextreme/spell-check',
    'devextreme/jest',
  ],
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx'
      ],
      parser: '@typescript-eslint/parser',
      extends: [
        'devextreme/typescript'
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'import/exports-last': 'error'
      },
    }
  ]
}

