const Course = require("../models/course"),
    getCourseParams = (body) => {
        return {
            title: body.title,
            description: body.description,
            maxStudents: parseInt(body.maxStudents),
            cost: parseFloat(body.cost)
        };
    };

module.exports = {
    index: (req, res, next) => {
        Course.find()
            .then(courses => {
                res.locals.courses = courses;
                next();
            })
            .catch(error => {
                console.log(`Error fetching courses: ${error.message}`);
                next(error);
            });
    },
    //Responding with JSON when query param exists
    indexView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.courses);
        } else {
            res.render("courses/index");
        }
    },
    new: (req, res) => {
        res.render("courses/new");
    },
    create: (req, res, next) => {
        let courseParams = getCourseParams(req.body);
        console.log(courseParams);
        Course.create(courseParams)
            .then(course => {
                req.flash("success", `${course.title} course successfully created!`);
                res.locals.redirect = "/courses";
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error saving course:${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        var courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error fetching course by ID: ${error.message}`)
                next(error);
            });
    },
    //Responding with JSON when query param exists
    showView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.course);
        } else {
            res.render("courses/show");
        }
    },
    edit: (req, res, next) => {
        var courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.render("courses/edit", {
                    course: course
                });
            })
            .catch(error => {
                console.log(`Error fetching course by ID:  ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let courseId = req.params.id,
            courseParams = getCourseParams(req.body);
        Course.findByIdAndUpdate(courseId, {
            $set: courseParams
        })
            .then(course => {
                req.flash("success", `${course.title} course successfully updated.`);
                res.locals.redirect = `/courses/${courseId}`;
                res.locals.course = course;
                next();
            })
            .catch(error => {
                req.flash("error", `Error updating course by ID: ${error.message}`);
                console.log(`Error updating course by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let courseId = req.params.id;
        Course.findByIdAndRemove(courseId)
            .then(() => {
                req.flash("success", `Course successfully deleted.`);
                res.locals.redirect = "/courses";
                next();
            })
            .catch(error => {
                console.log(`Error deleting course by ID: ${error.message}`);
                req.flash("error", `Error deleting course: ${error.message}`);
                next();
            });
    }
};
