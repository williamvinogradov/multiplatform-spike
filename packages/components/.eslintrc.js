module.exports = {
  root: false,
  extends: [
    '../../.eslintrc.js',
  ],
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
