module.exports = {
  // 程序启动监听的端口
  port: 3000,
  // 配置信息
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  // 地址
  mongodb: 'mongodb://localhost:27017/myblog'
}
