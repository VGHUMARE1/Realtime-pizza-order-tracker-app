const { EventEmitter } = require("connect-mongo");
const Order=require("../models/order");

module.exports.showOrders=async(req,res)=>{
    const currUser=req.user;
    const orders=await Order.find({owner:currUser._id});
    res.render("templets/orders/myOrders",{orders});
}

module.exports.placeOrder=async(req,res)=>{
    const {address,phonenumber}=req.body;
    const currUser=req.user;
    const card=req.session.card;
    // console.log(card);
    // console.log(currUser);

    const order=new Order({
        address:address,
        phoneNumber:phonenumber,
        totalItems:card.totalItems,
        totalPrice:card.totalPrice,
        owner:currUser._id,
        items:card.items
    });

    
    const newOrder=await order.save();
req.flash("success","Order Placed Successfully")
    req.session.card=null;
    const eventEmitter=req.app.get("eventEmitter");
    eventEmitter.emit('orderPlaced',order);
    res.redirect("/");
}

module.exports.showOrderStatus=async(req,res)=>{
    const {id}=req.params;
    const order=await Order.findById(id).populate('owner');
    // console.log(order);
    res.render("templets/orders/showOrderStatus",{order});
}
    