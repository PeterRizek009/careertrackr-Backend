require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jobsRoutes = require('./routes/Jobs');
const authRoutes = require('./routes/auth');

const app = express();

// CORS (required for POST from browser)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://peterrizek009.github.io"
  ],
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

// Handle OPTIONS (important!)
app.options("*", cors());

// JSON parser
app.use(express.json());

// Routes
app.use('/api', jobsRoutes);
app.use('/auth', authRoutes);

// Connect DB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
