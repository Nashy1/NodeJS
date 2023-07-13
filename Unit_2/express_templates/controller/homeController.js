exports.sendReqParam = (req,res)=>{
    let veg = req.params.vegetables;
    res.send("This is the page for " + veg);
};
//passing a route parameter.
exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;

    res.render("index",{name: paramsName});
    };