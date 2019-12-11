//返回文章所需的各种操作函数的闭包

const Post = require("../lib/mongo").Post;
const marked = require('marked');
const Comment = require('./comments');

// 给post添加中间件addCommentsCount
// 给post添加留言数属性
Post.plugin('addCommentsCount', {
  afterFind: function(posts) {
    return Promise.all(posts.map(function(post) {
      return Comment.getCommentsCount(post._id).then(function(commentsCount) {
        post.commentsCount = commentsCount;
        return post;
      })
    }))
  },
  afterFindOne: function(post) {
    if (post) {
      return Comment.getCommentsCount(post._id).then(function(count) {
        post.commentsCount = count;
        return post;
      })
    }
    return post;
  }
})

// 将post的content从markdown转换成html
Post.plugin('contentToHtml', {
  afterFind: function(posts) {
    return posts.map(function(post) {
      post.content = marked(post.content);
      return post;
    })
  },
  afterFindOne: function(post) {
    if (post) {
      post.content = marked(post.content);
    }
    return post;
  }
})

module.exports = {
  // 创建一篇文章
  create: function create (post) {
    return Post.create(post).exec();
  },

  // 通过id来获取一篇文章
  getPostById: function getPostById(Id) {
    return Post.findOne({ _id: Id }).populate({ path: 'author', model: 'User'}).addCreatedAt().addCommentsCount().contentToHtml().exec();
  },

  // 按创建时间降序获取所有用户文章或某个特定用户的所有文章
  getPosts: function getPosts(author) {
    const query = {};
    if (author) {
      query.author = author;
    }
    return Post.find(query).populate({ path: 'author', model: 'User' }).sort({ _id: -1 }).addCreatedAt().addCommentsCount().contentToHtml().exec();
  },

  // 通过id给点击量加1
  incPv: function incPv(Id) {
    return Post.update({ _id: Id }, { $inc: { pv: 1} }).exec();
  },

  // 通过id编辑文章
  getRawPostById: function getRawPostById(Id) {
    return Post.findOne({ _id: Id }).populate({ path: 'author', model: 'User' }).exec();
  },

  // 通过id更新一篇文章
  updatePostById: function updatePostById(Id, data) {
    return Post.update({ _id: Id }, { $set: data }).exec();
  },

  // 通过id删除一篇文章及其留言
  delPostById: function delPostById(Id) {
    return Post.deleteOne({ _id: Id }).exec().then(function(res) {
      if (res.result.ok && res.result.n > 0) {
        return Comment.delCommentsByPostId(Id);
      }
    })
  }
}

