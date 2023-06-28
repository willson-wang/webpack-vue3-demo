const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')

const resolveDir = (dir) => path.join(__dirname, `../${dir}`)

const cssAutoLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: false,
        importLoaders: 2,
        modules: {
            localIdentName: '[name]_[local]_[hash:base64:8]',
            auto: true
        }
    }
}

const cssModuleLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: false,
        importLoaders: 2,
        modules: {
            localIdentName: '[name]_[local]_[hash:base64:8]',
            auto: () => true
        }
    }
}

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: false,
        postcssOptions: {
            plugins: [
                'autoprefixer'
            ]
        }
    }
}

const styleLoader = process.env.NODE_ENV === 'development' ? {
    loader: 'vue-style-loader',
    options: {
        sourceMap: false,
        shadowMode: false
    }
} : {
    loader: MiniCssExtractPlugin.loader,
}

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: false,
        sassOptions: {
            indentedSyntax: true
        }
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        sourceMap: false
    }
}

module.exports = {
    entry: {
        app: [
            './src/main.ts'
        ]
    },
    resolve: {
        alias: {
            '@': resolveDir('src'),
            vue$: 'vue/dist/vue.runtime.esm-bundler.js'
        },
        extensions: [
            '.tsx',
            '.ts',
            '.mjs',
            '.js',
            '.jsx',
            '.vue',
            '.json',
            '.wasm'
        ]
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            {
                test: /\.m?jsx?$/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            babelParserPlugins: [
                                'jsx',
                                'classProperties',
                                'decorators-legacy'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                resourceQuery: /type=style/,
                sideEffects: true
            },
            {
                test: /\.(svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'media/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    filename: 'fonts/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            styleLoader,
                            cssModuleLoader,
                            postcssLoader
                        ]
                    },
                    {
                        use: [
                            styleLoader,
                            cssAutoLoader,
                            postcssLoader
                        ]
                    }
                ]
            },
            {
                test: /\.sass$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            styleLoader,
                            cssModuleLoader,
                            postcssLoader,
                            sassLoader
                        ]
                    },
                    {
                        use: [
                            styleLoader,
                            cssAutoLoader,
                            postcssLoader,
                            sassLoader
                        ]
                    }
                ]
            },
            {
                test: /\.less$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            styleLoader,
                            cssModuleLoader,
                            postcssLoader,
                            lessLoader
                        ]
                    },
                    {
                        use: [
                            styleLoader,
                            cssAutoLoader,
                            postcssLoader,
                            lessLoader
                        ]
                    }
                ]
            },
            {
                test: /\.m?(js|jsx|ts|tsx)$/,
                exclude: function (filepath) {
                    const SHOULD_SKIP = true
                    const SHOULD_TRANSPILE = false

                    if (!filepath) {
                        return SHOULD_SKIP
                    }

                    // Always transpile js in vue files
                    if (/\.vue\.jsx?$/.test(filepath)) {
                        return SHOULD_TRANSPILE
                    }

                    return /node_modules/.test(filepath) ? SHOULD_SKIP : SHOULD_TRANSPILE
                },
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
        ],

    },
    plugins: [
        new VueLoaderPlugin(),
        new DefinePlugin(
            {
                __VUE_OPTIONS_API__: true, // vue3 开启 options api
                __VUE_PROD_DEVTOOLS__: false, // vue3 在生产环境中禁用 devtools 支持
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    BASE_URL: JSON.stringify(process.env.BASE_URL || '/'),
                }
            }
        ),
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ]
}
