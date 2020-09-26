// 拿到一个模块得内容----处理---传递给下一个loader
// 不能为箭头函数
// 一定要有返回值
// 异步处理
// 多个loader处理
// 如何配置loader 如何接收参数
module.exports = function(source){
  // console.log(source,'loader接收得source');
  const cb = this.async()
  setTimeout(() =>{
    console.log('异步loader');
    cb(null,source.replace('一道墙', this.query.name))
  },100)
  // return source.replace('一道墙', this.query.name)
}