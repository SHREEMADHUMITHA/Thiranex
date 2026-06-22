const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to a placeholder MongoDB database
mongoose.connect('mongodb://localhost:2017/ecommerce_db')
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('E-Commerce API is running successfully!');
});

app.listen(5000, () => console.log('Server listening on port 5000'));
