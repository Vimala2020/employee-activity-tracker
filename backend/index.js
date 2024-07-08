const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

require('../backend/db/connection')


app.get('/', (req, res) => {
  res.send('Server Working');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
