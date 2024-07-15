const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./src/routes/attendance');

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/attendance', attendanceRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
