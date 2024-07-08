const mongoose = require('mongoose')

const DB = process.env.DB_URL

mongoose.connect(DB)
.then(() => {console.log("MongoDB connection successful!!")})
.catch((err) =>{console.log("MongoDB connection failed!! ", err.message)});

module.exports = mongoose