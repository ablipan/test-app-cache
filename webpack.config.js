var path = require('path')
var webpack = require('webpack')
var OfflinePlugin = require('offline-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      buildTime: new Date(),
      template: 'src/assets/index.html'
    })
  ]
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, './')
    })
  ])
  module.exports.module.rules = module.exports.module.rules.concat([
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: /node_modules/
    }
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output.publicPath = '/'
  module.exports.output.filename = 'build.[chunkhash:5].js'
  module.exports.module.rules = module.exports.module.rules.concat([
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }
  ])
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin("styles.[contenthash:5].css"),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BUILD_TIME: +new Date()
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new OfflinePlugin({
      ServiceWorker: false,
      AppCache: {
        events: true,
        disableInstall: true
      },
      //autoUpdate: 1000 * 10
    })
  ])
}
