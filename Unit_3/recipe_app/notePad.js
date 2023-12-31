// //17.8
// const Course = require("./models/course");
// let testCourse, testSubcriber;
// Course.create({
//     title: "Tomata Land",
//     description: "Locally farmed tomatoes only",
//     zipCode: 12345,
//     items: ["cherry", "heirloom"]
// }).then(course => testCourse = course);
// subscriber.findOne({}).then(
//     subscriber => testSubscriber = subscriber
// );
// testSubscriber.course.push(testCourse._id);
// testSubscriber.save();
// subscriber.populate(testSubcriber, "courses").then(subscriber => console.log(subscriber));


// //17.9
// const mongoose = require("mongoose"),
//     Subscriber = require("./models/subscriber"),
//     Course = require("./models/course");
// let testCourse,
//     testSubscriber;
// mongoose.connect(
//     "mongodb://localhost:27017/recipe_db",
//     { useNewUrlParser: true }
// );
// mongoose.Promise = global.Promise;
// Subscriber.remove({})
//     .then((items) => console.log(`Removed ${items.n} records!`))
//     .then(() => {
//         return Course.remove({});
//     })
//     .then((items) => console.log(`Removed ${items.n} records!`))
//     .then(() => {
//         return Subscriber.create({
//             name: "Jon",
//             email: "jon@jonwexler.com",
//             zipCode: "12345"
//         });
//     })
//     .then(subscriber => {
//         console.log(`Created Subscriber: ${subscriber.getInfo()}`);
//     })
//     .then(() => {
//         return Subscriber.findOne({
//             name: "Jon"
//         });
//     })
//     .then(subscriber => {
//         testSubscriber = subscriber;
//         console.log(`Found one subscriber: ${subscriber.getInfo()}`);
//     })
//     .then(() => {
//         return Course.create({
//             title: "Tomato Land",
//             description: "Locally farmed tomatoes only",
//             zipCode: 12345,
//             items: ["cherry", "heirloom"]
//         });
//     })
//     .then(course => {
//         testCourse = course;
//         console.log(`Created course: ${course.title}`);
//     })
//     .then(() => {
//         testSubscriber.courses.push(testCourse);
//         testSubscriber.save();
//     })
//     .then(() => {
//         return Subscriber.populate(testSubscriber, "courses");
//     })
//     .then(subscriber => console.log(subscriber))
//     .then(() => {
//         return Subscriber.find({
//             courses: mongoose.Types.ObjectId(
//  testCourse._id)
//         });
//     })
//     .then(subscriber => console.log(subscriber));



// //18.3
// let testUser;
// User.create({
//     name: {
//         first: "Jon",
//         last: "Wexler"
//     },
//     email: "jon@jonwexler.com",
//     password: "pass123"
// })
//     .then(user => testUser = user)
//     .catch(error => console.log(error.message));

// //18.5
// let targetSubscriber;
// Subscriber.findOne({
// email: testUser.email
// })
// .then(subscriber => targetSubscriber = subscriber);

// //18.6
// var testUser;
// User.create({
//     name: {
//         first: "Jon",
//         last: "Wexler "
//     },
//     email: "jon@jonwexler.com",
//     password: "pass123"
// })
//     .then(user => {
//         testUser = user;
//         return Subscriber.findOne({
//             email: user.email
//         });
//     })
//     .then(subscriber => {
//         testUser.subscribedAccount = subscriber;
//         testUser.save().then(user => console.log("user updated"));
//     })
//     .catch(error => console.log(error.message));