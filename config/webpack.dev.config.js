const path = require('path');
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
      path: resolveDir('dist'),
      filename: 'js/[name].js',
      publicPath: '/',
      chunkFilename: 'js/[name].js'
    },
    cache: {
        type: 'filesystem',
        name: 'dev-cache',
        version: process.env.NODE_ENV,
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin(
        {
          title: 'webpack-vue3-demo',
          scriptLoading: 'defer',
          template: resolveDir('public/index.html')
        }
      ),
    ]
})