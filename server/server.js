const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const mainRouter = require('./router/mainRouter.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Success Connected To MongoDB'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use('/', mainRouter);
