const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId)
        .then(user => {
            console.log("Success!")
            next();
        })
        .catch(error => {
            console.log(error);
            res.redirect('/auth/login')
        })
}