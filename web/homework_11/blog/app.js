var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//会话
var session = require('express-session');
//连接数据库
var MongoStore = require('connect-mongo')(session);
//显示通知
var flash = require('connect-flash');
//读取配置文件
var config = require('config-lite')(__dirname);
//日志文件
var winston = require('winston');
var expressWinston = require('express-winston');
//处理表单及文件上传
var expressFormdiable = require('express-formidable');
//将router文件夹的js文件整合统一路由
var routes = require('./routes');
var pkg = require('./package');


var app = express();

//blog挂载渲染变量app.locals
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//系统默认中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static静态目录
app.use(express.static(path.join(__dirname, 'public')));

//session中间件
app.use(session({
  //使用读取配置文件模块进行session设置
  name: config.session.key,
  secret: config.session.secret,
  resave: true,//强制更新session
  saveUninitialized: false,//强制创建会话
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({//上次存储在文件中，本次则存储在MongoDB中
    url: config.mongodb//数据库地址
  })
}));

//显示通知
app.use(flash());

//处理上传
app.use(expressFormdiable({
  uploadDir: path.join(__dirname, 'public/images'),//设置上传文件路径
  keepExtensions: true
}));

//user/success/error挂载渲染变量res.locals
app.use(function(req, res, next) {
  res.locals.user = req.session.user,//发出req的用户
  res.locals.success = req.flash('success').toString(),
  res.locals.error = req.flash('error').toString(),
  next()
});

//我们将blog变量挂载到app.locals而将user/success/error挂载到res.local的原因：
//express中有两个对象可用于模板的渲染：app.locals和res.locals，
//优先级：res.render 传入的对象> res.locals 对象 > app.locals 对象，
//所以 app.locals 和 res.locals 几乎没有区别，都用来渲染模板，
//使用上的区别在于：app.locals 上通常挂载常量信息（如博客名、描述、作者信息），
//res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）。

//日志中间件的使用：
//需要注意的是：记录正常请求日志的中间件要放到 routes(app) 之前，
//记录错误请求日志的中间件要放到 routes(app) 之后。

//记录正常请求日志的中间件
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

//路由
routes(app);

//记录错误请求日志的中间件
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  //错误处理并返回home page
  console.error(err);
  req.flash('error',err.message);
  res.redirect('/posts')
});

//!module.parent的使用注释
//module.parent来确定当前脚本是否由另一个脚本加载：
//example:
//a.js:
// if (!module.parent) {
//   console.log("I'm parent");
// } else {
//   console.log("I'm child");
// }
// b.js:
// require('./a')
// run node a.js will output:
// I'm parent
// run node.b.js will output:
// I'm child

//分层编程范例中，许多任务在更高层次的框架中完成，它提供了更好的性能和效率。
//同样适用于此。如果正在运行的模块的父对象未侦听任何端口，则此任务由其子对象显式完成。

if (!module.parent) {//若为子节点
  // 监听端口并启动程序
  app.listen(config.port, function() {
  console.log(`${pkg.name} listening on port ${config.port}`);
})  
} 
else
  module.exports = app;