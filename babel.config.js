module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'usage',
        corejs: '3.31.0'
      }
    ],
    [
      '@babel/preset-typescript', {
        allExtensions: true, // 必须要设置为true，不然处理不了单文件vue中的ts代码
        isTSX: true, // 必须要设置为true，不然解析.tsx这类文件的时候会报错
      }
    ]
  ],
  plugins: [
    // 使用文档https://github.com/vuejs/babel-plugin-jsx/blob/main/packages/babel-plugin-jsx/README-zh_CN.md
    '@vue/babel-plugin-jsx',
    '@babel/plugin-syntax-dynamic-import',
    // @babel/plugin-proposal-decorators 要在@babel/plugin-transform-class-properties前面，避免问题
    ['@babel/plugin-proposal-decorators', {
      version: '2023-05',
      // decoratorsBeforeExport: true,
      // legacy: false
    }],
    '@babel/plugin-transform-class-properties',
    ["@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true
      }
    ]
  ]
};
