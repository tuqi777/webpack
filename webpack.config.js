
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const minicssPlugin = require('mini-css-extract-plugin')

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
    ]
  },
  plugins:[
    new htmlPlugin({
      template:'./src/index.html',
      filename:'html/index.html'
    }),
    new CleanWebpackPlugin(),
    new minicssPlugin({
      filename:'css/[name].css',
    })
  ]
}