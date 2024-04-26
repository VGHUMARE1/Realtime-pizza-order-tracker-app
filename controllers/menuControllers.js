const Menu = require("../models/manu");

module.exports.index = async (req, res) => {
    const pizzas = await Menu.find({});
    res.render("templets/main/index", { pizzas });
}