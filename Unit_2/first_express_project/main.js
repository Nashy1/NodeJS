"use strict";
const port = 3000,
    express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController");


//8.1
// app.get("/", (req, res) => {
//     res.send("Hello, Universe!");
// })
// //9.1
//     app.get("/", (req, res) => {
//     console.log("params " +req.params);
//     console.log("body " +req.body);
//     console.log("URL " +req.url);
//     console.log("query " +req.query);
//     res.send("Hello, Nashverse!");
// })

// app.post("/contact", (req, res) => {
//     res.send("Contact information submitted successfully.");
//     });

//9.4
// app.use((req, res, next) => {
//     console.log(`request made to: ${req.url}`);
//     next();
// });

//9.2,3
//     app.get("/items/:vegetable", (req, res) => {
// let veg = req.params.vegetable;
// res.send(`This is the page for ${veg}`);         
// // res.send(req.params.vegetable);
//     })

//9.7
app.get("/items/:vegetable",homeController.sendReqParam);
// app.use(
//     express.urlencoded({
//     extended: false
//     })
//     );
//     app.use(express.json());

// //9.5
//     app.post("/", (req, res) => {
//     console.log(req.body);
//     console.log(req.query);
//     res.send("POST Successful!");
//     })
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
app.get("/items/:vegetable", homeController.sendReqParam);