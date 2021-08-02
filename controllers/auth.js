const User = require("../models/user");

// GET - register route
module.exports.registerUser = (req, res) => {
  res.render("auth/register");
};

// POST - register route
module.exports.postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to Campgrounds");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }

  req.flash("success", "Welcome to Campgrounds");
  res.redirect("/campgrounds");
};

// GET - login route
module.exports.getLogin = (req, res) => {
  res.render("auth/login");
};

// POST - login route
module.exports.postLogin = (req, res) => {
  req.flash("success", "Welcome Back!!");

  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// LOGOUT - route
module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Bye!");
  res.redirect("/");
};
