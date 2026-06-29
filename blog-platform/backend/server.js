const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

const app = express();
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Server connection stub
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
