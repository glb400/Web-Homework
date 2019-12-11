const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;

const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const UserModel = require('../models/users');

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup');
})

// POST /sign 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  const name = req.fields.name;
  const gender = req.fields.gender;
  const bio = req.fields.bio;
  const avatar = req.files.avatar.path.split(path.sep).pop();
  let password = req.fields.password;
  const repassword = req.fields.repassword;

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字长度限制在1-10个字符');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是m、f或x');
    }
    if (!(bio.length >= 1 && bio.length <= 50)) {
      throw new Error('个人简介长度限制在1-50个字符');
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像');
    }
    if (password.length < 6) {
      throw new Error('密码长度至少6个字符');
    }
    if (password != repassword) {
      throw new Error('两次输入密码不一致');
    }
  }
  catch (err) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path);
    req.flash('error', err.message);
    return res.redirect('/signup');
  }

  //加密
  password = sha1(password);

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  };
  // 用户信息写入数据库
  UserModel.create(user).then(function(result) {
    user = result.ops[0];
    delete user.password;
    req.session.user = user;
    console.log("success!");
    req.flash('success', '注册成功');
    res.redirect('/posts')
  }).catch(function(err) {
    // fs.unlink(req.files.avatar.path)
    if (err.message.match('duplicate key')) {
      req.flash('error', '用户名已被占用');
      return res.redirect('/signup');
    }
    next(err);
  })
})

module.exports = router;
