module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false
      }
    ],
    [
      '@babel/preset-typescript', {
        allExtensions: true,
        isTSX: true,
      }
    ]
  ],
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-syntax-dynamic-import',
    // @babel/plugin-proposal-decorators 要在@babel/plugin-transform-class-properties前面，避免问题
    ['@babel/plugin-proposal-decorators', {
      version: '2023-05',
      // decoratorsBeforeExport: true,
      // legacy: false
    }],
    '@babel/plugin-transform-class-properties',
  ]
};
