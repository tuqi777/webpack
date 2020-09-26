
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const minicssPlugin = require('mini-css-extract-plugin')
const fileLoader = require('file-loader')


module.exports = {
  mode:'development',
  entry:'./src/query.js',
  output: {
    path:path.resolve(__dirname,'bundle'),
    filename:'[name].js'
  } ,
  module:{
    rules: [
      {
        test: /\.css$/, 
        use: [minicssPlugin.loader,'css-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader' ,'css-loader','sass-loader']
      // }
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader:'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
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
      filename:'[name].css',
    })
  ]
}