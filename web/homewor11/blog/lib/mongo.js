//我们使用 Mongolass 这个模块操作 mongodb 进行增删改查。
//在 blog 下新建 lib 目录，在该目录下新建 mongo.js.用于数据库的声明和建立

//用法：
//定义schema：
//Mongolass 中的 Schema （基于 another-json-schema）是可选的，并且只用来做文档校验。
//如果定义了 schema 并关联到某个 model，则插入、更新和覆盖等操作都会校验文档是否满足 schema，同时 schema 也会尝试格式化该字段

const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');

//创建新的mongolass连接当前数据库
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

//定义用户表的schema，User是model
//schema用法具体说明如下述User的创建即为：
//建立一个collection的model（样板），定义了字段和字段的值类型
//对应的是数据库的User这个collection。

exports.User = mongolass.model('User', {
  name: { type: 'string', require: true  },
  password: { type: 'string', require: true },
  avatar: { type: 'string', require: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', require: true }
});
//根据用户名找到用户，用户名全局唯一
exports.User.index({name: 1}, {unique: true}).exec();

//时间库
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

//创建中间件addCreateAt，
//afterFind指数据操作返回结果为数组时，
//afterFindOne指返回为单个对象时
//创建时间戳_id，使得能够根据时序逻辑执行操作
mongolass.plugin('addCreatedAt', {
  afterFind: function(results) {
    results.forEach(function(item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results;
  },
  afterFindOne: function(result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result;
  }
})

// 定义文章存储的schema
exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId, require: true }, // 元素1：作者
  title: { type: 'string', require: true }, // 元素2：标题
  content: { type: 'string', require: true }, // 元素3：内容
  pv: { type: 'number', default: 0} // 元素4：点击量
})
// 按作者查看用户，按文章创建时间降序
exports.Post.index({ author: 1, _id: -1 }).exec();


// 定义留言存储的schema
exports.Comment = mongolass.model('Comment', {
  author: { type: Mongolass.Types.ObjectId, require: true }, // 元素1：作者
  content: { type: 'string', require: true }, // 元素2： 内容
  postId: { type: Mongolass.Types.ObjectId, requireL: true } // 元素3：评论的文章ID
})

// 通过文章id获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ postId: 1, _id: 1 }).exec(); 
