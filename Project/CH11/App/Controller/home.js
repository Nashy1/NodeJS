const BlogPost = require('../models/blogPost')

module.exports = async(req,res)=>{
    const blogpost  = await BlogPost.find({}).populate('userid');
    console.log(blogpost)
    console.log(req.session)
    res.render('index',{
        blogpost
    });
}