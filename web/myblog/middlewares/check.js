module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    // 当前用户信息不存在，即处于无登录状态
    if (!req.session.user) {
      req.flash('error', 'Not sign in');
      return res.redirect('/signin');
    }
    next()
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    // 当前用户信息存在，即处于已登录状态
    if (req.session.user) {
      req.flash('error', 'Have already signed in');
      return res.redirect('back'); // 返回到之前的页面
    }
    next()
  }
}
