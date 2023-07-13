const BlogPost = require('../models/blogPost')

module.exports = async(req,res)=>{
    const blogpost  = await BlogPost.find({})
    console.log(req.session)
    res.render('index',{
        blogpost
    });
}