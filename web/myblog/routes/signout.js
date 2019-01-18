const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET /signup 登出
router.get('/', checkLogin, function(req, res, next) {
  //res.send('登出')
  // 清空session中的用户信息
  req.session.user = null
  req.flash('success', '登出成功')
  // 等处成功后跳转到主页
  res.redirect('/posts')
})

module.exports = router
