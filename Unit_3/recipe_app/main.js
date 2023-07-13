// const mongoose = require("mongoose");
// // dbURL = "mongodb://127.0.0.1:27017",
// //     dbName = "recipe_db",
// mongoose.connect(
//     "mongodb://127.0.0.1:27017/recipe_db",
//     { useNewUrlParser: true }
// );
// const db = mongoose.connection;
// db.once("open", () => {
//     console.log("Successfully connected to MongoDB using Mongoose!");
// });
// // MongoDB.connect(dbURL, (error, client) => {
// //     if (error) throw error;
// //     let db = client.db(dbName);
// //     db.collection("contacts")
// //         .find()
// //         .toArray((error, data) => {
// //             if (error) throw error;
// //             console.log("reached her")
// //             console.log(data);
// //         });
// //     db.collection("contacts")
// //         .insert({
// //             name: "Freddie Mercury",
// //             email: "fred@queen.com"
// //         }, (error, db) => {
// //             if (error) throw error;
// //             console.log(db);
// //         });
// // });


// const subscriberSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     zipCode: Number
// });

// const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// // //i create  like this
// // var subscriber1 = new Subscriber({
// //     name: "Jon Wexler",
// //     email: "jon@jonwexler.com"
// // })
// // .then((result)=>{
// //     console.log("printing result");
// //     console.log(result);
// // })
// // .catch((error)=>{
// //     console.log('printing error');
// //     console.log(error);
// // })


// //or like this
// Subscriber.create(
//     {
//         name: "Jon Wexler7",
//         email: "jon@jonwexler.com"
//     })
//     .then((result)=>{
//         console.log("printing result");
//         console.log(result);
//     })
//     .catch((error)=>{
//         console.log('printing error');
//         console.log(error);
//     })






"use strict";

const express = require("express"),
    app = express(),
    errorController = require("./controllers/errorController"),
    homeController = require("./controllers/homeControlller"),
    usersController = require("./controllers/usersController"),
    subscribersController = require('./controllers/subscribersController'),
    methodOverride = require("method-override"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("sercet_passcode"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose");

mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);
// mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});



app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
Router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
app.use("/", router);

// app.get("/contact", subscribersController.getSubscriptionPage);
// app.post("/subscribe", subscribersController.saveSubscriber);
router.get("/users", usersController.index, usersController.indexView)
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.use(cookieParser("sercet_passcode"));
router.use(expressSession({
    sercet: "sercet_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitailized: false
}));
router.use(connectFlash());
// app.get("/name", homeController.respondWithName);
// app.get("/items/:vegetable", homeController.sendReqParam);



app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("Post Successful!");
});

app.get("/subscribers", subscribersController.getAllSubscribers,
    (req, res, next) => {
        console.log(req.data);
        res.render("Subscribers", { subscriber: req.data })
    });

router.get("/user/:id", usersController.show, usersController.showView);
router.get("/user/:id/edit", usersController.edit);
router.put("/user/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", userController.delete, usersController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log("Server running at http:"`localhost:${app.get("port")}`);
});