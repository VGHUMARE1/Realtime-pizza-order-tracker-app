const express=require("express");
const route=express.Router();
const controllers=require("../controllers/menuControllers");
const middleware=require("../middleware/middleware");

route.get("/",middleware.isAdmin,controllers.index);

 module.exports=route;