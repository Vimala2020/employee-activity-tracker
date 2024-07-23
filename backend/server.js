const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./src/routes/attendance');
const workProgressRoutes = require('./src/routes/WorkProgress');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employeeRoutes');
//const testEmailRoute = require('./src/routes/testEndPoint'); // Adjust the path accordingly




dotenv.config();

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/attendance', attendanceRoutes);
app.use('/api/workprogress', workProgressRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/employee', employeeRoutes);
//app.use('/api', testEmailRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
