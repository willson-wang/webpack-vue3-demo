const path = require('path');
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.config')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  output: {
    path: resolveDir('dist'),
    filename: 'js/[name].[chunkhash:8].js', // 使用chunkhash即可
    publicPath: '/',
    chunkFilename: 'js/[name].[chunkhash:8].js' // 使用chunkhash即可
  },
  cache: {
    type: 'filesystem', // 推荐文件缓存，方便CI场景复用缓存
    name: 'prod-cache',
    version: process.env.NODE_ENV,
  },
  optimization: {
    splitChunks: { // 提取两个chunk，一个是chunk-vendors、一个是chunk-common，只针对initial chunk进行提取
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      // 设置js压缩插件
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          parallel: true,
          extractComments: false
        }
      ),
      // 设置css压缩插件
      new CssMinimizerPlugin(
        {
          parallel: true,
          minimizerOptions: {
            preset: [
              'default',
              {
                mergeLonghand: false,
                cssDeclarationSorter: false
              }
            ]
          }
        }
      )
    ]
  },
  plugins: [
    // 清除上传构建产物
    new CleanWebpackPlugin(
      {
        dry: false
      }
    ),
    // 提取css插件
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash:8].css', // 注意这里一定要使用contenthash，不然无法保证最好的缓存效果
        chunkFilename: 'css/[name].[contenthash:8].css' // 注意这里一定要使用contenthash，不然无法保证最好的缓存效果
      }
    ),
    new HtmlWebpackPlugin(
      {
        title: 'webpack-vue3-demo',
        scriptLoading: 'defer',
        template: resolveDir('public/index.html')
      }
    ),
    new CopyPlugin(
      {
        patterns: [
          {
            from: resolveDir('public'), // 将public目录下的内容copy到dist目录
            to: resolveDir('dist'),
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: [
                '**/.DS_Store',
                resolveDir('public/index.html')
              ]
            },
            info: {
              minimized: true
            }
          }
        ]
      }
    ),
  ],
})
