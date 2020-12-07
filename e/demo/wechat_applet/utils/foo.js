function say(msg){
  console.log('hello ' + msg)
}
//导出say方法
module.exports = {
  say: say
}

// 不支持 exports.xxx ，只支持module.exports
exports.say = {}