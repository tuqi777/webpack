
const path = require('path')

module.exports = {
  mode:'development',
  entry:{
    index: './src/query.js',
    login: './src/login.js'
  },
  output: {
    path:path.resolve(__dirname,'bundle'),
    filename:'[name].js'
  },
}