const { sequelize } = require("../config/DB");
const { QueryTypes } = require("sequelize");
const getLogin = async (req, res) => {
  if (req.session.loggedIn === true) {
    return res.redirect("/admin");
  } else {
    return res.render("pages/auth.ejs");
  }
};

const postLogin = async (req, res) => {
  try {
    if (req.session.loggedIn === true) {
      return res.redirect("/admin");
    } else {
      const { username, password } = req.body;
      const user = await sequelize.query(
        `select * from useradmin where username = '${username}'`,
        {
          type: QueryTypes.SELECT,
        }
      );

      if (user.length === 0) {
        req.session.message = {
          message: "No User",
          type: "danger",
        };
        req.session.loggedIn = false;
      } else {
        if (password === user[0].password) {
          req.session.loggedIn = true;
          return res.redirect("/admin");
        } else {
          req.session.loggedIn = false;
          req.session.message = {
            message: "Invalid Credential",
            type: "danger",
          };
        }
      }
      return res.redirect(req.originalUrl);
    }
  } catch (err) {
    console.log(err);
  }
};

const logOut = async (req, res) => {
  req.session.loggedIn = false;
  res.redirect("/auth");
};

module.exports = {
  getLogin,
  postLogin,
  logOut,
};
