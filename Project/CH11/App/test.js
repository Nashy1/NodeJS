const mongoose = require('mongoose')
const blogPost = require('./models/blogPost');

mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });

blogPost.create({
    title: 'The Mythbuster Guide to Saving Money on Energy Bills',
    body: 'If the you have been here a long time, you might remember when i went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point list, a whole new world of thrifty nerdery opens up. You know thsoe bullet-point lists. You start spotting them everything at this time of the year. They go like this:'
}, (error,blogpost)=>{
    console(error,blogpost)
});