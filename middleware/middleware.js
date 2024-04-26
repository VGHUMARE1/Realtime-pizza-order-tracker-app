const Order = require("../models/order");

module.exports.isLogedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must loged in");
        res.redirect("/user/login");
    }
}

module.exports.redirecturl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;

    } else {
        res.locals.redirectUrl = "/";
    }
    next();
}

module.exports.isAdmin = async (req, res, next) => {
    if (req.isAuthenticated() && req.user._id.equals(process.env.ADMINID)) {
        const orders = await Order.find({}, null, { sort: { 'orderAt': -1 } }).populate('owner');
        return res.render("templets/admin/index", { orders});
    }
    next();
}

module.exports.haveAuthority = (req, res, next) => {
    if (req.isAuthenticated() && req.user._id.equals(process.env.ADMINID)) {
        return next();
    }
    req.flash("error", "You are not admin of this app");
    res.redirect("/");
}

module.exports.isOwner = async (req, res, next)=> {
    const { id } = req.params;
    const currUserId=req.user._id;
    const order = await Order.findById(id).populate('owner');
    // console.log(order);
    if (order.owner[0]._id.equals(currUserId)) {
        return next();
    }else{
    req.flash("error","Your are not owner of this Order");
    res.redirect("/");
    }
}