require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const engine = require('ejs-mate');
const mongoose = require("mongoose");
const sessions = require('express-session');
const flash = require("connect-flash");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Emitter = require("events");


const menuRoute = require("./routes/manu");
const cardRoute = require("./routes/card");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");

// database connection creation  
const dburl = process.env.DBURL;

const main = async () => {
    await mongoose.connect(dburl);
}
main().then(() => {
    console.log("database Connected....")
}).catch((err) => {
    console.log(err);
})

// Emitter
const eventEmitter = new Emitter();
app.set("eventEmitter",eventEmitter);


// session config
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})

store.on("error", (err) => {
    console.log("ERROR IN SESSION STORE", err);
})
const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: Date.now() + 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}
app.use(sessions(sessionOptions));
app.use(flash());

// passport local Strategy config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.totalCardItems = !req.session.card ? "" : req.session.card.totalItems;
    // res.locals.totalCardItems=0
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(req.session);
    next()
})


app.use("/", menuRoute);
app.use("/card", cardRoute);
app.use("/", orderRoute);
app.use("/", userRoute);


app.get("*", (req, res) => {
    res.send("Page not found");
});

const server=app.listen(port, () => {
    console.log("connected....");
});

//socket
const io=require("socket.io")(server);

io.on("connection",(socket)=>{
    socket.on("join",(roomId)=>{
        console.log(roomId);
        socket.join(roomId);
    })
})

eventEmitter.on('orderUpdated',(data)=>{
    io.to(data.id).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})
