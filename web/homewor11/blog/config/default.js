//配置文件
module.exports = {
  // 程序启动监听的端口
  port: 3000,
  // 配置信息
  session: {
    secret: 'blog',
    key: 'blog',
    maxAge: 2592000000
  },
  // 地址
  mongodb: 'mongodb://localhost:27017/blog'
}
