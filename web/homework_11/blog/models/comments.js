const marked = require('marked');

//返回comments所需的各种操作函数的闭包

//marked.js是一个可以在线转码Markdown的JavaScript编写的库。
//可以非常方便的在线编译Markdown代码为HTML并直接显示，并且支持完全的自定义各种格式。

const Comment = require('../lib/mongo').Comment;

// 将comment的content从markdown转换成html
Comment.plugin('contentToHtml', {
  afterFind: function(comments) {
    return comments.map(function(comment) {
      comment.content = marked(comment.content);
      return comment;
    });
  }
})

module.exports = {
  // 创建一个留言
  create: function create(comment) {
    return Comment.create(comment).exec();
  },

  // 通过id获取一个留言
  getCommentById: function getCommentById(Id) {
    return Comment.findOne({ _id: Id }).exec();
  },

  // 通过id删除一个留言
  delCommentById: function delCommentById(Id) {
    return Comment.deleteOne({ _id: Id }).exec();
  },

  // 通过文章id删除该文章下所有留言
  delCommentsByPostId: function delCommentsByPostId(postId) {
    return Comment.deleteMany({ postId: postId }).exec();
  },

  // 通过文章id获取该文章下所有留言，按留言创建时间升序
  getComments: function getComments(postId) {
    return Comment.find({ postId: postId }).populate({ path: 'author', model: 'User'} ).sort({ _id: 1 }).addCreatedAt().contentToHtml().exec();
  },

  // 通过文章id获取该文章下留言数
  getCommentsCount: function getCommentsCount(postId) {
    return Comment.count({ postId: postId }).exec();
  }
}
