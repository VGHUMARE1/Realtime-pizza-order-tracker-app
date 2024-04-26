const express=require("express");
const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
const controllers=require("../controllers/cardControllers");
const middleware=require("../middleware/middleware");

router.get("/",controllers.showCardItems);

router.post("/:id/add",controllers.addToCard)

module.exports=router;