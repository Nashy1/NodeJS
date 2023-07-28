const mongoose = require("mongoose");
const db = require("./models");

const createTutorial = function(tutorial) {
    return db.Tutorial.create(tutorial).then(docTutorial => {
      console.log("\n>> Created Tutorial:\n", docTutorial);
      return docTutorial;
    });
  };
  

const createImage = function(tutorialId, image) {
    return db.Image.create(image).then(docImage => {
      console.log("\n>> Created Image:\n", docImage);
      return db.Tutorial.findByIdAndUpdate(
        tutorialId,
        {
          $push: {
            images: {
              _id: docImage._id,
              url: docImage.url,
              caption: docImage.caption
            }
          }
        },
        { new: true, useFindAndModify: false }
      );
    });
  };

  const createComment = function(tutorialId, comment) {
    return db.Comment.create(comment).then(docComment => {
      console.log("\n>> Created Comment:\n", docComment);
  
      return db.Tutorial.findByIdAndUpdate(
        tutorialId,
        { $push: { comments: docComment._id } },
        { new: true, useFindAndModify: false }
      );
    });
  };


  const getTutorialWithPopulate = function(id) {
    // return db.Tutorial.findById(id).populate("comments");
    return db.Tutorial.findById(id).populate("comments", "-_id -__v");
  };

  const createCategory = function(category) {
    return db.Category.create(category).then(docCategory => {
      console.log("\n>> Created Category:\n", docCategory);
      return docCategory;
    });
  };
  
  const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      { category: categoryId },
      { new: true, useFindAndModify: false }
    );
  };








  const run = async function() {
    var tutorial = await createTutorial({
      title: "Tutorial #1",
      author: "bezkoder"
    });

    var category = await createCategory({
      name: "Node.js",
      description: "Node.js tutorial"
    });
  
  
    tutorial = await createComment(tutorial._id, {
      username: "jack",
      text: "This is a great tutorial.",
      createdAt: Date.now()
    });
    console.log("\n>> Tutorial:\n", tutorial);
  
    tutorial = await createComment(tutorial._id, {
      username: "mary",
      text: "Thank you, it helps me alot.",
      createdAt: Date.now()
    });
    console.log("\n>> Tutorial:\n", tutorial);

    tutorial = await getTutorialWithPopulate(tutorial._id);
    console.log("\n>> populated Tutorial:\n", tutorial);
    tutorial = await addTutorialToCategory(tutorial._id, category._id);
    console.log("\n>> Tutorial:\n", tutorial);
  };
  

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