"use strict";

const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
};

exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${ errorCode } | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${ error.stack }`);
    res.status(errorCode);
    res.send(`${ errorCode } | Sorry, our application is experiencing a problem!`);
};
let courses = [
    {
      title:"Event Driven Cakes",
      cost: 50
    },
    {
      title:"Asynchronous Artichoke",
      cost:25
    },
    {
      title:"Object Oriented Orange Juice",
      cost: 10
    }
  ];
  module.exports = {
    showCourses: (req,res)=>{
      res.render("courses",{
        offeredCourses: courses
      });
    }
  };