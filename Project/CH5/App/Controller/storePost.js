const BlogPost = require('../models/blogPost')
const path = require('path')

module.exports = (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/img',image.name),
    async (error)=>{
        await BlogPost.create({
            ...req.body,
            image:'/img/' + image.name
        })
        res.redirect('/')
    })
}

// module.exports = (req,res)=>{
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname,'..','public/img',image.name))
//     .then ((x)=>{
//          BlogPost.create({
//             ...req.body,
//             image:'/img/' + image.name
//         });
//         res.redirect('/')
//     })
//     .catch(error =>{
//         console.log(error)
//     })
// }