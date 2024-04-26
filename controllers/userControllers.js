const User = require("../models/user");
module.exports.loginForm = (req, res) => {
    res.render("templets/user/login");
};


module.exports.registerForm = (req, res) => {
    res.render("templets/user/register");
}

module.exports.registerUser = async (req, res) => {
    try {
        const fakeUser = {
            username: req.body.username,
            email: req.body.email
        }
        const newUser = await User.register(fakeUser, req.body.password);
        req.flash("success", "register successfully")
        req.login(newUser, (err) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/user/signin");
            }
            res.redirect("/");
        })
    }
    catch (err) {
    req.flash("error",err.message);
    }
}

module.exports.loginUser = (req, res) => {
    req.flash("success", "login successfully");
    res.redirect(res.locals.redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            req.flash("error", "logout successfully");
        } else {
            req.flash("success", "logout successfully");
        }
        res.redirect("/");
    });
}