const exp = require('express'),
HC = require("./controller/homeController"),
ER = require("./controller/errorController"),
layouts = require('express-ejs-layouts'),
app = exp();


//setting the port number
app.set("port", process.env.PORT || 3000);

app.use(layouts);
app.use(
    exp.urlencoded({
        extended: false
    })
)
app.use((req,res,next)=>{
    console.log(`request made to: ${req.url}`);
    next();
})

app.set('view engine','ejs');

app.use(exp.static("public"));

app.get("/items/:vegetable", HC.sendReqParam);

app.get('/name/:myName',HC.respondWithName);

//Handle missing routes and errors with custom messages
app.use(ER.respondNoResourceFound);
app.use(ER.respondInternalError);

app.listen(app.get('port'), () => {
    console.log(`The Express.js server has started and is listening on port number: ${app.get('port')}`);
});