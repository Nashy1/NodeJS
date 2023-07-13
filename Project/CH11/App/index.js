const express = require('express');
const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const exp = require('constants');
const { error } = require('console');
const homeController = require('./Controller/home.js');
const storePostController = require('./Controller/storePost.js');
const getPostController = require('./Controller/getPost.js')
const newPostController = require('./Controller/newPost.js');
const newUserController = require('./Controller/newUser.js');
const validationMiddleware = require('./Middleware/validationMiddeware.js');
const storeUserController = require('./Controller/storeUser');
const loginController = require('./Controller/login.js');
const loginUserController = require('./Controller/loginUser.js');
const logoutController = require('./Controller/logout.js')
const flash = require('connect-flash');
const authMiddleware = require('./Middleware/authMiddleware.js');
const redirectIfAuthenticatedMiddleware = require('./Middleware/redirectIfAuthenticatedMiddleware.js');
const expressSession = require('express-session');
const { get } = require('https');

mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use(flash())
app.use('/post/store', validationMiddleware)
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use('*',(req,res,next)=>{
    loggedIn = req.session.userId;
    next()
});

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware,newUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout',logoutController)
app.get('/posts/new',authMiddleware,newPostController)
app.post('/posts/store', storePostController)
app.post('/users/register',redirectIfAuthenticatedMiddleware ,storeUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)
app.use((req,res)=> res.render('notfound'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})