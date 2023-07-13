"use strict";
// //4.1
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   app = http.createServer((request, response) => {
//     console.log("Received an incoming request!");
//     response.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html"
//     });
//     let responseMessage = "<h1>Hello, Universe!</h1>";
//     response.write(responseMessage);
//     response.end();
//     console.log(`Sent a response: ${responseMessage}`);
//   });
// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);


// //another way
// const http = require("http"),
//   server = http.createServer((req, res) => {
//     console.log("Received an incoming request!");
//     // res.setHeader( "Content-Type": "text/html" );
//     let resMessage = "<h1>Hello Nashverse!</h1>";
//     res.end(resMessage);
//     console.log(`Send a response: ${resMessage} `)
//   });
// server.listen(3000, () => {
//   console.log("server has started and is listening on port number : 3000 ")
// });