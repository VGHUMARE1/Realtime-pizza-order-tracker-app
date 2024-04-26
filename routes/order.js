const express=require("express");
const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
const orderControllers=require("../controllers/orderControllers");
const adminControllers=require("../controllers/adminControllers");
const middleware=require("../middleware/middleware");


router.get("/user/orders",middleware.isLogedIn,orderControllers.showOrders);
router.post("/order",middleware.isLogedIn,orderControllers.placeOrder);

router.post("/order/:id/status",middleware.isLogedIn,middleware.haveAuthority,adminControllers.changeStatus);
router.get("/order/:id/status",middleware.isLogedIn,middleware.isOwner,orderControllers.showOrderStatus);

module.exports=router;