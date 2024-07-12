const express = require("express");
const scheduler = require('./src/config/scheduler');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./src/routes/attendance');
const progressRoutes = require('./src/routes/WorkProgress');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api/attendance', attendanceRoutes);
app.use('/api/progress', progressRoutes);



app.use('/api/department', departmentRoutes);
app.use('/api/employee', employeeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started on port " + port);
    scheduler();
});
