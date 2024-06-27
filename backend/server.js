const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log('O servidor está rodando na porta 5000');
    });
  })
  .catch((err) => console.log(err));
