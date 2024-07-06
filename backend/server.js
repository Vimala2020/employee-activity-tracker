
//using express
const express = require("express");
const mongoose = require("mongoose");
const cors = require ('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const employeeRoutes = require('./src/routes/employee');
const attendanceRoutes = require('./src/routes/attendance');
const progressRoutes = require('./src/routes/progress');
// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

app.use(bodyParser.json({limit: "20mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended:true}));
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connected tO MongoDB');
});

//route
app.use('/api/attendance', attendanceRoutes);
app.use('/api/progress', progressRoutes);

//start the server

const port= process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("server started");
})