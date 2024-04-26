const mongoose=require("mongoose");

const cardSchema=new mongoose.Schema({
    name: {
        tyep: String,
        required: true,
    },
    image: {
        tyep: String,
        required: true,
    },
    size: {
        tyep: String,
        required: true,
    },
    price: {
        tyep: String,
        required: true,
    },
    quntity: {
        tyep: Number,
        required: true,
        default: 1
    }
});

const Card=mongoose.model("Card",cardSchema);
module.exports=Card;