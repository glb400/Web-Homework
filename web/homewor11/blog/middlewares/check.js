//判断当前是否处于登录状态的函数
//判断方式：判断当前用户信息是否存在

module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/signin');//返回登录页
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back'); //返回上一页面
    }
    next();
  }
}
