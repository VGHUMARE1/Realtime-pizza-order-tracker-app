const Menu = require("../models/manu");
module.exports.showCardItems = (req, res) => {
    const cardItems = req.session.card;
    res.render("templets/cards/card.ejs", { cardItems });
}

module.exports.addToCard = async (req, res) => {
    const { id } = req.params;
    const pizza = await Menu.findById(id);
    const currSession = req.session;

    if (!currSession.card) {
        currSession.card = {
            items: [],
            totalItems: 0,
            totalPrice: 0
        }
    }
    // currSession.card.items = [];
    // currSession.card.totalItems = 0;
    // currSession.card.totalPrice = 0;

    const arr = currSession.card.items.filter((obj) => {
        return obj._id === id;
    })
    if (arr.length == 0) {
        let newPizza = {
            _id: pizza._id,
            name: pizza.name,
            price: pizza.price,
            size: pizza.size,
            quntity: 1,
        }
        currSession.card.items.push(newPizza);
    } else {
        arr[0].quntity = arr[0].quntity + 1;
    }
    currSession.card.totalPrice = currSession.card.totalPrice + pizza.price;
    currSession.card.totalItems = currSession.card.totalItems + 1
    req.flash("success","added to card");
    res.redirect("/");
}