const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const userRouter = require('./routes/user');
const feedbackRouter = require('./routes/location');
const cors = require('cors');
require('dotenv').config();

const db = mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/location', feedbackRouter);

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
