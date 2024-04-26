const mongoose = require("mongoose");
const Menu = require("./manu.js");
const dburl = "mongodb+srv://ghumarevaishnavib:WPlwFH7ACFRcaDDB@cluster0.alfqrpe.mongodb.net/?retryWrites=true&w=majority";
const main = async () => {
  await mongoose.connect(dburl);
}
main().then(() => {
  console.log("Connected....")
}).catch((err) => {
  console.log(err);
})


const data = [
  {
    name: "Margherita",
    image: "pizza.png",
    price: "250",
    size: "small"
  },
  {
    name: "Marinara",
    image: "pizza.png",
    price: "300",
    size: "medium"
  },
  {
    name: "Carbonara",
    image: "pizza.png",
    price: "200",
    size: "small"
  },
  {
    name: "Americana",
    image: "pizza.png",
    price: "500",
    size: "large"
  },
  {
    name: "Chicken Mushroom",
    image: "pizza.png",
    price: "350",
    size: "medium"
  },
  {
    name: "Paneer pizza",
    image: "pizza.png",
    price: "200",
    size: "small"
  },
  {
    name: "Vegies pizza",
    image: "pizza.png",
    price: "600",
    size: "large"
  },
  {
    name: "Pepperoni",
    image: "pizza.png",
    price: "500",
    size: "medium"
  }
]

const init = async (idata) => {
  await Menu.deleteMany({});
  const data = await Menu.insertMany(idata);
  console.log(data);
}

init(data).catch((err) => {
  console.log(err);
})