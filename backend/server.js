const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use('/users', userRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log('O servidor está rodando na porta 5000');
    });
  })
  .catch((err) => console.log(err));
