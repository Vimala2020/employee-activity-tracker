//using express
const express = require("express");
const mongoose = require("mongoose");
const cors = require ('cors');
const dotEnv = require ('dotenv')

//create an instance
const app = express();

//route
app.get('/',(req,res)=>{
    res.send("hello world")
})

//start the seerver

const port= 3000;
app.listen(port,()=>{
    console.log("server started");
})