module.exports = {
  plugins: [
    // require('press'),
    require('autoprefixer')({
      overrideBrowserslist:["last 2 versions" ,">1%"],
    })
  ]
}