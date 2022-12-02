module.exports = {
  root: false,
  extends: [
    '../../.eslintrc.js',
  ],
  plugins: [
    'react-hooks',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
  },
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
