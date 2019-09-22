const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (env, args) => {
  const IS_PRODUCTION = args.mode === 'production';
  return {
    entry: ['./resources/assets/scripts/main.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                "es2015"
              ],
            }
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: [{ loader: 'css-loader', options: { url: false } }, { loader: 'sass-loader', options: { url: false } }],
            })
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
      ]
    },
    devServer: {
      port: 9000
    },
    optimization: {
      minimizer: [
        new MinifyPlugin({}, {
          test: /\.js(\?.*)?$/i
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
        })
      ]
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'main.css' }),
      new VueLoaderPlugin()
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    }
  }
};