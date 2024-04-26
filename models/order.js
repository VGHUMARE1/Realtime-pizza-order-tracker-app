const mongoose = require("mongoose");
const User = require("./user");

const orderSchema = new mongoose.Schema({
    totalItems: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Order Placed", "Cancelled", "Delivered", "Out for delevary", "Confirmed","Preparation"],
        default: "Order Placed"
    },
    paymentType: {
        type: String,
        enum: ["Cash On Delivery", "Online"],
        default: "Cash On Delivery"
    },
    items: [{}],
    owner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
   
    orderAt: {
        type: Date,
        default: Date.now(),
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;