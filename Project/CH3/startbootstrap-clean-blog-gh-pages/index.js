const express =require('express')
const app = new express()
const path = require('path')

app.listen(5000,()=>{
    console.log('App listening on port 5000')
})

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public/about.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public/contact.html'))
})

app.get('/post',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public/post.html'))
})