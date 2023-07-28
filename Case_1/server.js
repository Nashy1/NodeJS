const mongoose = require("mongoose");


mongoose
    .connect('mongodb://127.0.0.1/bezkoder_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((connection) => {
        // Drop the database for me
        connection.db.dropDatabase();
        console.log('Successfully connected to MongoDB.');
    })
    .catch(err => console.error('Connection error', err))


run();