const express = require('express');// this require the module
const app = express();//this calls express function to start new express app
const path = require('path');//this will help us get ths specific path to the file

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})

app.use(express.static('public'))

//this is a route
// app.get('/',(req,res)=>{
//     res.json({
//         name:'Nash MaCash'
//     })//this will print on the bs
// })

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))//helps us get the full absolute path
})



app.get('/about',(req,res)=>{
    // res.json({
    //     name: 'Nash LizzP'
    // })
    res.sendFile(path.resolve(__dirname,'about.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'contact.html'))
})