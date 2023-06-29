const path = require('path');
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map', // 指定生产source-map的方式
  output: {
    path: resolveDir('dist'),
    filename: 'js/[name].js', // 使用name即可，无需使用chunkhash等
    publicPath: '/',
    chunkFilename: 'js/[name].js' // 使用name即可，无需使用chunkhash等
  },
  cache: {
    type: 'filesystem', // 开发环境也可以使用内存模式
    name: 'dev-cache',
    version: process.env.NODE_ENV,
  },
  devServer: {
    static: { // 保证public下的文件能过支持访问
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true, // 保证刷新浏览器的时候前端路由能够正常命中不会出现404
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'webpack-vue3-demo',
        scriptLoading: 'defer',
        template: resolveDir('public/index.html') // 指定入口html文件
      }
    ),
  ]
})
