const express = require("express");
const passport = require("passport");
// const app=express();
const route = express.Router({ mergeParams: true });
const controllers = require("../controllers/userControllers");
const middleware=require("../middleware/middleware");

route.get("/user/login", controllers.loginForm);

// route.post("/login", passport.authenticate("local", { failureRedirect: "/user/login", failureFlash: true }), controllers.loginUser);
route.post("/user/login",middleware.redirecturl, passport.authenticate("local", { failureRedirect: "/user/login", failureFlash: true }), controllers.loginUser);

route.get("/user/register", controllers.registerForm);

route.post("/user/register", controllers.registerUser);

route.get("/user/logout",controllers.logout);

module.exports = route;