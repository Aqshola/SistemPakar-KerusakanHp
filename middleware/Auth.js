const Auth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/auth/");
  }
  next();
};

module.exports = Auth;
