const mongoose= require("mongoose");

const mongoURL = require('./config/keys')

mongoose.connect(mongoURL,{useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connection;

connection.on('error',()=>{
    console.log("Mongo DB connection failed")
})

connection.on('connected',()=>{
    console.log("Mongo DB Connection Successful")
})
 
module.exports = mongoose