const mongoose = require('mongoose');
const db = require('./models');

const createTutorial = function (tutorial) {
    // Want to return the database after creation
    // So that we can work with the latest database object
    return db.Tutorial.create(tutorial)
        .then(docTutorial => {
            console.log('\n>> Created Tutorial:\n', docTutorial)
            return docTutorial;
        })
}

const createImage = function (tutorialId, image) {
    return db.Image
        // First create image in it's own collection
        .create(image)
        //Then add the image id to the tutorial collection.
        .then(docImage => {
            console.log('\n>> Created Image:\n', image);
            return db.Tutorial.findByIdAndUpdate(
                tutorialId,
                {
                    $push: {
                        images: {
                            // Added _id:
                            _id: docImage._id,
                            url: image.url,
                            caption: image.caption
                        }
                    }
                },
                { new: true, useFindAndModify: false }
            );
        })
};

// First create the comment in the comment collection, then
//
// Find the record in the tutorial collection by it's id
// Then add the id of the record in the comment collection
// Into the Tutorial collection comment field, which is an array
// to reference.
const createComment = function (tutorialId, comment) {
    return db.Comment.create(comment).then(docComment => {
        return db.Tutorial.findByIdAndUpdate(
            tutorialId,
            { $push: { comments: docComment._id } },
            { new: true, useFindAndModify: false }
        )
    })
}

// The comments array field of Tutorial contains reference IDS to comments.
// Let's use that to extract the information from comments and display it within the tutorial collection.
const getTutorialWithPopulate = function(id) {
    return db.Tutorial.findById(id).populate('comments', '-_id -__v');
}

const createCategory = function(category) {
    return db.Category.create(category)
    .then(docCategory => {
        console.log('\n Created Category:\n', docCategory);
        return docCategory;
    });
};

const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
        tutorialId,
        { category: categoryId },
        { new: true, useFindAndModify: false }
    )
}

const getTutorialsInCategory = function(categoryId) {
    return db.Tutorial.find({ category: categoryId })
        .populate('category', 'name -_id')
        .select('-comments -images -__v');        
}

const run = async function () {

    var tutorial = await createTutorial({
        title: 'How to create one-to-one MongoDB relationships',
        author: 'bezkoder'
    });

    var category = await createCategory({
        name: 'MongoDB',
        description: 'MongoDB tutorial'        
    });    

    await addTutorialToCategory(tutorial._id, category._id);

    var newTutorial = await createTutorial({
        title: 'How to use .populate() in MongoDB',
        author: 'bezkoder'
    });

    await addTutorialToCategory(newTutorial._id, category._id);

    var tutorials = await getTutorialsInCategory(category._id);
    console.log('\n>< All Tutorials in Category:\n', tutorials);
}

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