
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const minicssPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  mode:'development',
  entry:'./src/query.js',
  output: {
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    contentBase: './dist',
    port: 8000,
    // hot: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      } 
    }
  },
  resolveLoader:{
    modules:["./node_modules", './loaders']
  },
  module:{
    rules: [
      {
        test: /\.css$/, 
        use: [minicssPlugin.loader,'css-loader','postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader' ,'css-loader','postcss-loader','sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader:'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/', // 解决打包后图片路径加载问题
            limit: 50 * 1024 // 小于50k得图片，转成base64
          }
        }
      },
      {
        test: /\.(eot|woff)$/,
        use:{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // outputPath: 'assets/font/', // 解决打包后图片路径加载问题
          }
        }
      },
      {
        test: /\.js$/,
        // exclude: '/node_modules',
        use:[
          'replaceLoader',
          {
          loader: 'replaceLoaderAsync',
          options: {
            name: 'replaceLoader'
          }
        }
        ]
      }

    ]
  },
  plugins:[
    new htmlPlugin({
      template:'./src/index.html',
      filename:'index.html'
    }),
    new CleanWebpackPlugin(),
    new minicssPlugin({
      filename:'css/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}