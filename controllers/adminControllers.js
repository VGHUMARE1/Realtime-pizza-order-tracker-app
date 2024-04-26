const Order = require("../models/order");

module.exports.changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status: status }, {
        new: true
    });
    const eventEmitter=req.app.get("eventEmitter");
    eventEmitter.emit('orderUpdated',{id:id,status:status});
    req.flash("success", "Status for Order get Changed Successfully");
    res.redirect("/");
}