const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    User=require("./models/user");
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.connection;
let contacts = [
    {
        name: "Jon Wexler",
        email: "jon@jonwexler.com",
        zipCode: 10016
    },
    {
        name: "Chef Eggplant",
        email: "eggplant@recipeapp.com",
        zipCode: 20331
    },
    {
        name: "Professor Souffle",
        email: "souffle@recipeapp.com",
        zipCode: 19103
    }
];
User.deleteMany()
    .exec()
    .then(() => {
        console.log("Subscriber data is empty!");
    });
let commands = [];
contacts.forEach((c) => {
    commands.push(Subscriber.create({
        name: c.name,
        email: c.email
    }));
});
Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });